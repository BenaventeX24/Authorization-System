import { Request, Response } from "express";

export interface GraphContext {
  req: Request;
  res: Response;
  payload?: { user_id: number };
}
