import { Prisma } from "@prisma/client";
import { ZodError } from "zod";
import { Request, Response, NextFunction } from "express";

export class AppError extends Error {
  statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
  }
}

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  // ZOD ERROR
  if (err instanceof ZodError) {
    return res.status(400).json({
      success: false,
      message: err.issues[0].message,
    });
  }

  // PRISMA KNOWN ERROR
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    switch (err.code) {
      case "P2002":
        return res.status(409).json({
          success: false,
          message: "Email already regisddtered",
        });

      case "P2025":
        return res.status(404).json({
          success: false,
          message: "Data not found",
        });

      default:
        return res.status(400).json({
          success: false,
          message: "Database request error",
        });
    }
  }

  // FALLBACK
  return res.status(err.statusCode || 500).json({
    success: false,
    message:
      process.env.NODE_ENV === "production"
        ? "Something went wrong"
        : err.message,
  });
};
