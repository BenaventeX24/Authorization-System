import { prisma } from "@/prisma_utils/prisma-client";
import { Field, ObjectType, Query, Resolver } from "type-graphql";

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
