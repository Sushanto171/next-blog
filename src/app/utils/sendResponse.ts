import { Response } from "express";

interface IMeta {
  page?: number;
  total?: number;
  totalPage?: number;
  limit?: number;
}

interface IResponse<T> {
  statusCode: number;
  success: boolean;
  message: string;
  data: T;
  meta?: IMeta;
  stack?: T;
}

export const sendResponse = <T>(res: Response, data: IResponse<T>) => {
  res.status(data.statusCode).json({
    success: data.success,
    message: data.message,
    statusCode: data.statusCode,
    data: data.data,
    meta: data.meta,
    stack: data.stack,
  });
};
