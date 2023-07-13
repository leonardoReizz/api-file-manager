import { NextFunction, Request, Response } from "express";
import { UpdateUserInfoUseCase } from "./update-user-info-use-case";
import { z } from "zod";
import { EmailAlreadyExists } from "../../../errors/EmailAlreadyExists";
import { ResourceNotFoundError } from "../../../errors/resource-not-found-error";

export class UpdateUserInfoController {
  constructor(private updateUserInfoUsecase: UpdateUserInfoUseCase) {}

  async handle(request: Request, response: Response, next: NextFunction) {
    try {
      const updateUserBodySchema = z.object({
        id: z.string(),
        fullName: z.string().optional(),
        email: z.string().optional(),
      });

      const data = updateUserBodySchema.parse(request.body);
      const { user } = await this.updateUserInfoUsecase.execute(data);

      return response.status(200).json({ message: user });
    } catch (error) {
      if (
        error instanceof EmailAlreadyExists ||
        error instanceof ResourceNotFoundError
      ) {
        return response.status(400).json({ message: error.message });
      }
      console.log(error);
      next(error);
    }
  }
}
