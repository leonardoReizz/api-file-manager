import { NextFunction, Request, Response } from "express";
import { ChangePasswordUseCase } from "./change-password-use-case";
import { ResourceNotFoundError } from "../../../errors/resource-not-found-error";
import { z } from "zod";
import { AuthenticatedRequest } from "../../../../middlewares/verify-jwt";
import { InvalidCredentialsError } from "../../../errors/InvalidCredentialsError";

export class ChangePasswordController {
  constructor(private changePasswordUseCase: ChangePasswordUseCase) {}

  async handle(request: Request, response: Response, next: NextFunction) {
    try {
      const changePasswordBodySchema = z.object({
        currentPassword: z.string(),
        newPassword: z.string(),
      });

      const userIdSchema = z.string();
      const userId = userIdSchema.parse(
        (request as AuthenticatedRequest).userId
      );

      const data = changePasswordBodySchema.parse(request.body);
      const { user } = await this.changePasswordUseCase.execute({
        userId,
        ...data,
      });
      return response.status(200).json({ message: user });
    } catch (error) {
      console.log(error);
      if (
        error instanceof ResourceNotFoundError ||
        error instanceof InvalidCredentialsError
      ) {
        return response.status(400).json({ message: "User not found" });
      }
      next(error);
    }
  }
}
