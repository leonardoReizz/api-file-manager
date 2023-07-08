import { Response, NextFunction, Request } from "express";
import jwt from "jsonwebtoken";
import { env } from "../env";

export function verifyJWTRole(allowedRoles: string[]) {
  return (request: Request, response: Response, next: NextFunction) => {
    const token = request.headers.authorization?.split(" ")[1];

    if (!token) {
      return response.status(401).json({ message: "Token não fornecido" });
    }

    const secretKey = env.JWT_SECRET;

    try {
      const decoded: any = jwt.verify(token, secretKey);

      const hasValidRole = allowedRoles.includes(decoded.role);

      if (!hasValidRole) {
        return response.status(403).json({ message: "Acesso negado" });
      }

      next();
    } catch (error) {
      return response.status(403).json({ message: "Invalid Token" });
    }
  };
}
