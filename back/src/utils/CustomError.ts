import { GraphQLError } from "graphql";

export class CustomError extends GraphQLError {
  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, CustomError.prototype);
  }
}
