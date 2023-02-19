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
import { prisma } from "../prisma_utils/prisma-client";
import { compareSync, hash } from "bcryptjs";
import { GraphContext } from "./GraphContext";
import { AuthMiddleware } from "./auth-middlerware";
import {
  issueRefreshToken,
  revokeRefreshToken,
} from "@/token/issue-refresh-token";
import { sign } from "jsonwebtoken";
import { Prisma } from "@prisma/client";
import { Request, Response } from "express";
import { PrismaErrorHandler } from "@/prisma_utils/prisma-error-handler";

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

  authenticate = async (
    email: string,
    password: string,
    req: Request,
    res: Response
  ): Promise<LoginResult | Error> => {
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
            } else throw new Error("Incorrect email or password");
          } else throw new Error("Incorrect email or password");
          return result;
        });
    } catch (e) {
      console.log(e);
      result = new Error("Internal server error");
    }
    return result;
  };

  @Mutation(() => Boolean)
  async register(
    @Arg("email") email: string,
    @Arg("password") password: string,
    @Arg("name") name: string,
    @Arg("surname") surname: string,
    @Ctx() { req, res }: GraphContext
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
        PrismaErrorHandler(e);
      }
      throw e;
    }
    return this.authenticate(email, password, req, res);
  }

  @Mutation(() => LoginResult)
  async login(
    @Arg("email") email: string,
    @Arg("password") password: string,
    @Ctx() { req, res }: GraphContext
  ): Promise<LoginResult | Error> {
    return this.authenticate(email, password, req, res);
  }

  @Mutation(() => Boolean)
  async logout(@Ctx() { res, req }: GraphContext) {
    revokeRefreshToken(req, res);

    return true;
  }
}
