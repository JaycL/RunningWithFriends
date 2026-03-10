import { ApiResponse } from "../utils/ApiReponse.js";

export const errorMiddleware = (err, req, res, next) => {
  console.error(err);

  const statusCode = err.statusCode || 500;

  res.status(statusCode)
  .json(
    new ApiResponse(
        statusCode,
        null,
        err.message || "Internal Server Error"
    )
  );
};