import { Field, ObjectType, Query, Resolver } from "type-graphql";
import { prisma } from "@/prisma_utils/prisma-client";

@ObjectType()
export class getUsersEmail {
  @Field()
  email: string;
}

@Resolver()
export class userResolver {
  @Query(() => [getUsersEmail])
  getEmails() {
    let result = prisma.users.findMany({
      select: {
        email: true,
      },
    });
    return result;
  }
}
