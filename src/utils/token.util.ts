import jwt, { Secret, SignOptions } from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const SECRET: Secret = process.env.JWT_SECRET || "secret";

export const signToken = (payload: object): string => {
  const options: SignOptions = {
    expiresIn: (process.env.JWT_EXPIRES_IN as SignOptions["expiresIn"]) || "7d",
  };
  return jwt.sign(payload, SECRET, options);
};

export const verify = (token: string) => {
  try {
    return jwt.verify(token, SECRET);
  } catch (err) {
    throw new Error("Invalid or expired token");
  }
};
