import { NextFunction, Request, Response } from "express";
import { AuthenticateUseCase } from "./authenticate-use-case";
import { z } from "zod";
import { InvalidCredentialsError } from "../../../errors/InvalidCredentialsError";
import { generateToken } from "../../../utils/generate-jwt/generate-token";
import { generateRefreshToken } from "../../../utils/generate-jwt/generate-refresh-token";

export class AuthenticateController {
  constructor(private authenticateUseCase: AuthenticateUseCase) {}

  async handle(request: Request, response: Response, next: NextFunction) {
    try {
      const authenticateSchema = z.object({
        email: z.string().email().max(52),
        password: z.string().max(32).min(8),
      });

      const data = authenticateSchema.parse(request.body);

      const { user } = await this.authenticateUseCase.execute(data);

      const { token } = generateToken("", user._id.toString());
      const { refreshToken } = generateRefreshToken("", user._id.toString());

      return response
        .status(200)
        .send({ message: { accessToken: token, refreshToken } });
    } catch (error) {
      if (error instanceof InvalidCredentialsError) {
        return response.status(400).send({ message: error.message });
      }

      next(error);
    }
  }
}
