import { Response } from "express";

export const success = (
  res: Response,
  data: any,
  message = "OK",
  status = 200
) => {
  return res.status(status).json({
    success: true,
    message,
    data,
  });
};

export const error = (
  res: Response,
  message = "Error",
  status = 500
) => {
  return res.status(status).json({
    success: false,
    message,
  });
};

// Add this function for 401 Unauthorized responses
export const unauthorized = (res: Response, message = "Unauthorized") => {
  return res.status(401).json({
    success: false,
    message,
  });
};
