import { env } from "../../../env";
import jwt from "jsonwebtoken";

export function generateRefreshToken(role: string, userId: string) {
  const payload = {
    refreshToken: true,
    userId,
  };

  const secretKey = env.JWT_SECRET;

  const options: jwt.SignOptions = {
    expiresIn: "9h",
  };

  const token = jwt.sign(payload, secretKey, options);
  return { refreshToken: token };
}
