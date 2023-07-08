import { NextFunction, Request, Response } from "express";
import { UnfavoriteFileUseCase } from "./unfavorite-file-use-case";
import { z } from "zod";
import { AuthenticatedRequest } from "../../../../middlewares/verify-jwt";

export class UnfavoriteFileController {
  constructor(private unfavoriteFileUseCase: UnfavoriteFileUseCase) {}

  async handle(request: Request, response: Response, next: NextFunction) {
    try {
      const folderIdHeaderSchema = z.string();
      const folderId = folderIdHeaderSchema.parse(request.params.folderId);

      const userIdSchema = z.string();
      const userId = userIdSchema.parse(
        (request as AuthenticatedRequest).userId
      );

      const fileIdSchema = z.string();
      const fileId = fileIdSchema.parse(request.params.fileId);

      await this.unfavoriteFileUseCase.execute({
        userId,
        folderId,
        fileId,
      });
      return response.status(200).json({ message: { fileId, folderId } });
    } catch (error) {
      next(error);
    }
  }
}
