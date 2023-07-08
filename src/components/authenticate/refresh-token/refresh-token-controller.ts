import { NextFunction, Request, Response } from "express";
import { InvalidCredentialsError } from "../../errors/InvalidCredentialsError";
import { z } from "zod";
import { generateRefreshToken } from "../../utils/generate-jwt/generate-refresh-token";
import { generateToken } from "../../utils/generate-jwt/generate-token";
import { AuthenticatedRequest } from "../../../middlewares/verify-jwt";
import { RefreshTokenUseCase } from "./refresh-token-use-case";

export class RefreshTokenController {
  constructor(private refreshTokenUseCase: RefreshTokenUseCase) {}

  async handle(request: Request, response: Response, next: NextFunction) {
    try {
      const refreshSchema = z.string();

      const userId = refreshSchema.parse(
        (request as unknown as AuthenticatedRequest).userId
      );
      const { user } = await this.refreshTokenUseCase.execute(userId);

      const { refreshToken } = generateRefreshToken("", user._id.toString());
      const { token } = generateToken("", user._id.toString());

      return response
        .status(200)
        .json({ message: { refreshToken, accessToken: token } });
    } catch (error) {
      if (error instanceof InvalidCredentialsError) {
        return response.status(400).json({ message: error.message });
      }
      next(error);
    }
  }
}
