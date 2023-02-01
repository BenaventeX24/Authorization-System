import { Request, Response } from "express";
import { sign } from "jsonwebtoken";

export const issueRefreshToken = (
  req: Request,
  res: Response,
  user_id: number,
  token_v: number
) => {
  if (!req.cookies["__Secure-1lcb"]) {
    res.cookie(
      "__Secure-1lcb",

      sign(
        { user_id: user_id, token_v: token_v },
        process.env.TOKEN_SECRET as string,
        {
          expiresIn: "180d",
        }
      ),
      {
        expires: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000),
        httpOnly: true,
        path: "/refresh_token",
        domain: "localhost",
        secure: true,
      }
    );
  }
};

export const revokeRefreshToken = (req: Request, res: Response) => {
  if (!req.cookies["__Secure-1lcb"]) {
    res.cookie("__Secure-1lcb", "", {
      httpOnly: true,
      path: "/refresh_token",
      domain: "localhost",
      secure: true,
    });
  }
};
