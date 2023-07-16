import { NextFunction, Request, Response } from "express";
import { SaveFileUseCase } from "./save-file-use-case";
import { z } from "zod";
import { AuthenticatedRequest } from "../../../../middlewares/verify-jwt";

export class SaveFileController {
  constructor(private saveFileUseCase: SaveFileUseCase) {}

  async handle(request: Request, response: Response, next: NextFunction) {
    try {
      const folderIdHeaderSchema = z.string();
      const folderId = folderIdHeaderSchema.parse(request.params.folderId);

      const userIdSchema = z.string();
      const userId = userIdSchema.parse(
        (request as AuthenticatedRequest).userId
      );

      if (request.file) {
        const file = await this.saveFileUseCase.execute({
          folderId,
          file: request.file,
          userId,
        });
        return response.status(200).json({ message: file });
      } else {
        throw new Error("Invalid file");
      }
    } catch (error) {
      next(error);
    }
  }
}
