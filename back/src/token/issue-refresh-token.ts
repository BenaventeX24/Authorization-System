import { Request, Response } from "express";
import { sign } from "jsonwebtoken";

export const issueRefreshToken = (
  req: Request,
  res: Response,
  user_id: number,
  token_v: number
) => {
  if (!req.cookies[process.env.AUTHSYS_COOKIE_NAME as string]) {
    res.cookie(
      process.env.AUTHSYS_COOKIE_NAME as string,

      sign(
        { user_id: user_id, token_v: token_v },
        process.env.AUTHSYS_TOKEN_SECRET as string,
        {
          expiresIn: "180d",
        }
      ),
      {
        expires: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000),
        httpOnly: true,
        secure: true,
        sameSite: "none",
      }
    );
  }
};

export const revokeRefreshToken = (req: Request, res: Response) => {
  if (req.cookies[process.env.COOKIE_NAME as string]) {
    res.cookie(process.env.COOKIE_NAME as string, "", {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });
  }
};
