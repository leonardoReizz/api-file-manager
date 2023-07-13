import { NextFunction, Request, Response } from "express";
import { z } from "zod";
import { AuthenticatedRequest } from "../../../../middlewares/verify-jwt";
import { DeleteFileUseCase } from "./delete-file-use-case";

export class DeleteFileController {
  constructor(private deleteFileUseCase: DeleteFileUseCase) {}

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

      const deleted = await this.deleteFileUseCase.execute({
        userId,
        folderId,
        fileId,
      });
      return response.status(200).json({ message: deleted });
    } catch (error) {
      next(error);
    }
  }
}
