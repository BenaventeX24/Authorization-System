import { GraphContext } from "@/utils/GraphContext";
import { MiddlewareFn } from "type-graphql";
import { verify } from "jsonwebtoken";

export const AuthMiddleware: MiddlewareFn<GraphContext> = (
  { context },
  next
) => {
  const authorizationHeader = context.req.headers["authorization"];
  let refreshToken = verify(
    context.req.cookies[process.env.AUTHSYS_COOKIE_NAME as string],
    process.env.AUTHSYS_TOKEN_SECRET!
  ) as any;

  if (!refreshToken) {
    throw new Error("AUTH_FAILED");
  }

  if (!authorizationHeader) {
    throw new Error("AUTH_FAILED");
  }

  try {
    const token = authorizationHeader.split(" ")[1];

    const payload = verify(token, process.env.AUTHSYS_TOKEN_SECRET!);

    context.payload = payload as any;
  } catch (err) {
    throw new Error("AUTH_FAILED");
  }

  return next();
};
