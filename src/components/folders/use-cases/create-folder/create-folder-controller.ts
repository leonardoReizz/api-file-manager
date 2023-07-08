import { NextFunction, Request, Response } from "express";
import { z } from "zod";
import { AuthenticatedRequest } from "../../../../middlewares/verify-jwt";
import { CreateFolderUseCase } from "./create-folder-use-case";

export class CreateFolderController {
  constructor(private createFolderUseCase: CreateFolderUseCase) {}

  async handle(request: Request, response: Response, next: NextFunction) {
    try {
      const getUserSchema = z.string();
      const userId = getUserSchema.parse(
        (request as AuthenticatedRequest).userId
      );

      const folderBodySchema = z.object({
        name: z.string().min(5).max(32),
      });
      const { name } = folderBodySchema.parse(request.body);

      const created = await this.createFolderUseCase.execute({ userId, name });

      return response.status(201).json({ message: { ...created } });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}
