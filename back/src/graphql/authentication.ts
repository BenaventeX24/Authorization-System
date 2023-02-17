import {
  Arg,
  Resolver,
  Mutation,
  ObjectType,
  Field,
  Ctx,
  UseMiddleware,
  Query,
} from "type-graphql";
import { prisma } from "../prisma-client";
import { compareSync, hash } from "bcryptjs";
import { GraphContext } from "./GraphContext";
import { AuthMiddleware } from "./auth-middlerware";
import {
  issueRefreshToken,
  revokeRefreshToken,
} from "@/token/issue-refresh-token";
import { sign } from "jsonwebtoken";
import { Prisma } from "@prisma/client";

@ObjectType()
export class LoginResult {
  @Field()
  accessToken: string;
}

@Resolver()
export class Authentication {
  @Query(() => String)
  hello() {
    return `hi!`;
  }

  @Query(() => String)
  @UseMiddleware(AuthMiddleware)
  bye(@Ctx() { payload }: GraphContext) {
    return `bye ${payload!.user_id}`;
  }

  @Mutation(() => Boolean)
  async register(
    @Arg("email") email: string,
    @Arg("password") password: string,
    @Arg("name") name: string,
    @Arg("surname") surname: string
  ) {
    try {
      await prisma.users.create({
        data: {
          email: email,
          password: await hash(password, 12),
          name: name,
          surname: surname,
        },
      });
    } catch (e: any) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        // The .code property can be accessed in a type-safe manner
        if (e.code === "P2002") {
          console.log(
            "There is a unique constraint violation, a new user cannot be created with this email"
          );
        }
      }
      throw e;
    }
    return true;
  }

  @Mutation(() => LoginResult)
  async login(
    @Arg("email") email: string,
    @Arg("password") password: string,
    @Ctx() { req, res }: GraphContext
  ): Promise<LoginResult | Error> {
    console.log(email, password);

    let result: LoginResult | Error = new LoginResult();
    try {
      await prisma.users
        .findFirst({
          where: {
            email: email,
          },
        })
        .then((user: any) => {
          if (user) {
            if (compareSync(password, user.password)) {
              issueRefreshToken(req, res, user.user_id, user.token_v);
              result = {
                accessToken: sign(
                  { user_id: user.user_id },
                  process.env.TOKEN_SECRET as string,
                  {
                    expiresIn: "2m",
                  }
                ),
              };
            } else result = new Error("Incorrect email or password");
          } else result = new Error("Incorrect email or password");
          return result;
        });
    } catch (e) {
      console.log(e);

      result = new Error("Internal server error");
    }

    return result;
  }

  @Mutation(() => Boolean)
  async logout(@Ctx() { res, req }: GraphContext) {
    revokeRefreshToken(req, res);

    return true;
  }
}
