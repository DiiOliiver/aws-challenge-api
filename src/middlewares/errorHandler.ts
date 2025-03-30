import { Request, Response } from "express";

export function errorHandler(err: Error, req: Request, res: Response) {
  res.status(500).json({ error: "Internal server error" });
}
