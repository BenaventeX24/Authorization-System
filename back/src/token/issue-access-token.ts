import { sign, verify } from "jsonwebtoken";
import { Request } from "express";

export const issueAccessToken = (req: Request): { accessToken: string } => {
  try {
    let payload = verify(
      req.cookies[process.env.COOKIE_NAME as string],
      process.env.TOKEN_SECRET!
    ) as any;

    return {
      accessToken: sign(
        { user_id: payload.user_id },
        process.env.TOKEN_SECRET as string,
        {
          expiresIn: "1m",
        }
      ),
    };
  } catch (e) {
    throw new Error("Authentication failed");
  }
};
