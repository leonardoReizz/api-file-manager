import { NextFunction, Request, Response } from "express";
import { z } from "zod";
import { AuthenticatedRequest } from "../../../../middlewares/verify-jwt";
import { ListFilesUseCase } from "./list-files-use-case";

export class ListFilesController {
  constructor(private listFilesUseCase: ListFilesUseCase) {}

  async handle(request: Request, response: Response, next: NextFunction) {
    try {
      const getUserSchema = z.string();
      const userId = getUserSchema.parse(
        (request as AuthenticatedRequest).userId
      );

      const { folders } = await this.listFilesUseCase.execute(userId);

      return response.status(200).json({ message: folders });
    } catch (error) {
      next(error);
    }
  }
}
