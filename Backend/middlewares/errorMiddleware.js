class ErrorHandler extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

export const errorMiddleware = (err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || "Internal Server Error";

  // Duplicate key error
  if (err.code === 11000) {
    message = `Duplicate ${Object.keys(err.keyValue)} Entered`;
    statusCode = 400;
  }

  // JWT errors
  if (err.name === "JsonWebTokenError") {
    message = "Json Web Token is invalid, Try Again!";
    statusCode = 400;
  }

  if (err.name === "TokenExpiredError") {
    message = "Json Web Token is expired, Try Again!";
    statusCode = 400;
  }

  // Mongoose Cast Error
  if (err.name === "CastError") {
    message = `Invalid ${err.path}`;
    statusCode = 400;
  }

  // Mongoose Validation Errors
  if (err.name === "ValidationError") {
    message = Object.values(err.errors).map(e => e.message).join(", ");
    statusCode = 400;
  }

  return res.status(statusCode).json({
    success: false,
    message,
  });
};


export default ErrorHandler;
