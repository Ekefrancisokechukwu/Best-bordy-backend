import { Request, Response, NextFunction } from "express";

export interface CustomError extends Error {
  statusCode?: number;
  errors?: { [key: string]: { message: string } };
}

export const errorMiddleware = (
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const customError = {
    statusCode: err.statusCode || 500,
    message: err.message || "Internal Server Error",
  };

  if (err.name == "ValidationError" && err.errors) {
    customError.message = Object.values(err.errors)
      .map((item) => item.message)
      .join(",");
    customError.statusCode = 400;
  }

  if (err.name === "CastError") {
    customError.message = `No item found`;
    customError.statusCode = 404;
  }

  res.status(customError.statusCode).json({
    success: false,
    error: {
      message: customError.message,
      ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
    },
  });
};
