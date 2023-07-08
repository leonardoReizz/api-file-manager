import { NextFunction, Request, Response } from "express";
import { GetUserUseCase } from "./get-user-use-case";
import { ResourceNotFoundError } from "../../../errors/resource-not-found-error";
import { z } from "zod";
import { AuthenticatedRequest } from "../../../../middlewares/verify-jwt";

export class GetUserController {
  constructor(private getUserUseCase: GetUserUseCase) {}

  async handle(request: Request, response: Response, next: NextFunction) {
    try {
      const getUserSchema = z.string();
      const userId = getUserSchema.parse(
        (request as AuthenticatedRequest).userId
      );

      const { user } = await this.getUserUseCase.execute(userId);

      return response.status(200).json({ message: { ...user } });
    } catch (error) {
      if (error instanceof ResourceNotFoundError) {
        return response.status(400).json({ message: error.message });
      }
      next(error);
    }
  }
}
