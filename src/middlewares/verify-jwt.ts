import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { env } from "../env";

export interface AuthenticatedRequest extends Request {
  userId?: string;
  role: "admin" | "user";
  refreshToken?: boolean;
}

export function verifyJWT(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const secretKey = env.JWT_SECRET;

  const token = request.headers.authorization?.split(" ")[1];

  if (!token) {
    return response.status(401).json({ message: "Invalid token" });
  }

  try {
    const decoded: any = jwt.verify(token, secretKey);
    (request as AuthenticatedRequest).userId = decoded.userId as string;

    if (decoded.refreshToken)
      return response.status(403).json({ message: "Invalid Token" });

    next();
  } catch (error) {
    return response.status(403).json({ message: "Invalid Token" });
  }
}
