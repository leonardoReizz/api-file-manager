import { NextFunction, Request, Response } from "express";
import { z } from "zod";
import { AuthenticatedRequest } from "../../../../middlewares/verify-jwt";
import { UnpinFolderUseCase } from "./unpin-folder-use-case";

export class UnpinFolderController {
  constructor(private unpinFolderUseCase: UnpinFolderUseCase) {}

  async handle(request: Request, response: Response, next: NextFunction) {
    try {
      const folderIdHeaderSchema = z.string();
      const folderId = folderIdHeaderSchema.parse(request.params.folderId);

      const userIdSchema = z.string();
      const userId = userIdSchema.parse(
        (request as AuthenticatedRequest).userId
      );

      const id = await this.unpinFolderUseCase.handle({ folderId, userId });

      return response.status(200).json({ message: { folderId: id } });
    } catch (error) {
      next(error);
    }
  }
}
