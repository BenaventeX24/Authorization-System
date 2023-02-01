import { MiddlewareFn } from "type-graphql";
import { verify } from "jsonwebtoken";
import { GraphContext } from "@/graphql/GraphContext";

export const AuthMiddleware: MiddlewareFn<GraphContext> = (
  { context },
  next
) => {
  const authorization = context.req.headers["authorization"];

  if (!authorization) {
    throw new Error("Authentication failed");
  }

  try {
    const token = authorization.split(" ")[1];

    const payload = verify(token, process.env.TOKEN_SECRET!);

    context.payload = payload as any;
  } catch (err) {
    throw new Error("Authentication failed");
  }

  return next();
};
