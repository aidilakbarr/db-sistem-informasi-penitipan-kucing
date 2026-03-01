import { Response } from "express";

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
  errors?: any;
}

export const sendSuccess = <T>(
  res: Response,
  message: string,
  data?: T,
  statusCode: number = 200,
) => {
  const response: ApiResponse<T> = {
    success: true,
    message,
    data,
  };

  return res.status(statusCode).json(response);
};

export const sendError = (
  res: Response,
  message: string,
  errors?: any,
  statusCode: number = 500,
) => {
  const response: ApiResponse<null> = {
    success: false,
    message,
    errors,
  };

  return res.status(statusCode).json(response);
};
