import { NextFunction, Request, Response } from "express";

export const globalErrorHandler = (
  error: any,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  console.log("Global Error", error);
  res.status(500).json("Something want wrong");
};
