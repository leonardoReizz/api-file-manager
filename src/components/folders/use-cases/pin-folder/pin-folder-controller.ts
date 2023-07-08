import { NextFunction, Request, Response } from "express";
import { PinFolderUseCase } from "./pin-folder-use-case";
import { z } from "zod";
import { AuthenticatedRequest } from "../../../../middlewares/verify-jwt";

export class PinFolderController {
  constructor(private pinFolderUseCase: PinFolderUseCase) {}

  async handle(request: Request, response: Response, next: NextFunction) {
    try {
      const folderIdHeaderSchema = z.string();
      const folderId = folderIdHeaderSchema.parse(request.params.folderId);

      const userIdSchema = z.string();
      const userId = userIdSchema.parse(
        (request as AuthenticatedRequest).userId
      );

      const id = await this.pinFolderUseCase.handle({
        folderId,
        userId,
      });

      return response.status(200).json({ message: { folderId: id } });
    } catch (error) {
      next(error);
    }
  }
}
