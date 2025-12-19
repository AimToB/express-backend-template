import { AppError } from "../utils/AppError.js";

export const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;

  console.error("ERROR", {
    message: err.message,
    stack: err.stack,
    statusCode,
  });

  res.status(statusCode).json({
    success: false,
    error: err.isOperational ? err.message : "Something went wrong, try again!",
  });
};
