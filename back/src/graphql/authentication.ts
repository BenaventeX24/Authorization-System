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
import { issueAccessToken } from "@/token/issue-access-token";

@ObjectType()
export class LoginResult {
  @Field()
  accessToken: string;
}

@Resolver()
export class Authentication {
  @Query(() => String)
  @UseMiddleware(AuthMiddleware)
  bye(@Ctx() { payload }: GraphContext) {
    return `bye ${payload!.user_id}`;
  }

  @Mutation(() => Boolean)
  async register(
    @Arg("email") email: string,
    @Arg("password") password: string,
    @Arg("username") username: string
  ) {
    try {
      await prisma.users.create({
        data: {
          email: email,
          password: await hash(password, 12),
          username: username,
        },
      });
    } catch (e) {
      console.log(e);
      return false;
    }
    return true;
  }

  @Mutation(() => LoginResult)
  async login(
    @Arg("email") email: string,
    @Arg("password") password: string,
    @Ctx() { req, res }: GraphContext
  ): Promise<LoginResult | Error> {
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
              result = issueAccessToken(req);
            } else result = new Error("Incorrect email or password");
          } else result = new Error("Incorrect email or password");
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
