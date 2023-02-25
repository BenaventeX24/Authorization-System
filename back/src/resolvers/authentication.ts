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
import { compare, compareSync, hash } from "bcryptjs";
import { GraphContext } from "../utils/GraphContext";
import { AuthMiddleware } from "../utils/auth-middlerware";
import {
  issueRefreshToken,
  revokeRefreshToken,
} from "@/token/issue-refresh-token";
import { sign } from "jsonwebtoken";
import { Request, Response } from "express";
import { PrismaErrorHandler } from "@/prisma_utils/prisma-error-handler";
import { Prisma, Users } from "@prisma/client";

@ObjectType()
export class LoginResult {
  @Field()
  accessToken: string;
  @Field()
  username: string;
  @Field()
  usersurname: string;
}

@Resolver()
export class Authentication {
  @Query(() => Boolean)
  @UseMiddleware(AuthMiddleware)
  testAuth() {
    return true;
  }

  authenticate = async (
    email: string,
    password: string,
    req: Request,
    res: Response
  ): Promise<LoginResult | Error> => {
    let result: LoginResult | Error = new LoginResult();
    try {
      return Promise.resolve(
        prisma.users.findFirst({
          where: {
            email: email,
          },
        })
      ).then(async (user: any) => {
        if (user) {
          if (compareSync(password, user.password)) {
            issueRefreshToken(req, res, user.user_id, user.token_v!);
            result = {
              accessToken: sign(
                { user_id: user.user_id },
                process.env.TOKEN_SECRET as string,
                {
                  expiresIn: "2m",
                }
              ),
              username: user.name,
              usersurname: user.surname,
            };
          } else throw new Error("WRONG_CREDENTIALS");
        } else throw new Error("WRONG_CREDENTIALS");
        return result;
      });
    } catch (e) {
      throw e;
    }
  };

  @Mutation(() => LoginResult)
  async register(
    @Arg("email") email: string,
    @Arg("password") password: string,
    @Arg("name") name: string,
    @Arg("surname") surname: string,
    @Ctx() { req, res }: GraphContext
  ) {
    try {
      return await Promise.resolve(
        prisma.users.create({
          data: {
            email: email,
            password: await hash(password, 12),
            name: name,
            surname: surname,
          },
        })
      ).then(
        async (user) => await this.authenticate(user.email, password, req, res)
      );
    } catch (e: any) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        throw PrismaErrorHandler(e);
      } else throw e;
    }
    return true;
  }

  @Mutation(() => LoginResult)
  async login(
    @Arg("email") email: string,
    @Arg("password") password: string,
    @Ctx() { req, res }: GraphContext
  ): Promise<LoginResult | Error> {
    return this.authenticate(email, password, req, res);
  }

  @Query(() => Boolean)
  @UseMiddleware(AuthMiddleware)
  async logout(@Ctx() { payload, req, res }: GraphContext) {
    try {
      revokeRefreshToken(req, res);
    } catch (e: any) {
      throw e;
    }
    return true;
  }
}
