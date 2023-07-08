import { NextFunction, Request, Response } from "express";
import { ResourceNotFoundError } from "../../../errors/resource-not-found-error";
import { z } from "zod";
import { AuthenticatedRequest } from "../../../../middlewares/verify-jwt";
import { DeleteFolderUseCase } from "./delete-folder-use-case";

export class DeleteFolderController {
  constructor(private deleteFolderUseCase: DeleteFolderUseCase) {}

  async handle(request: Request, response: Response, next: NextFunction) {
    try {
      const getUserSchema = z.string();
      const userId = getUserSchema.parse(
        (request as AuthenticatedRequest).userId
      );

      const folderIdHeaderSchema = z.string();
      const folderId = folderIdHeaderSchema.parse(request.params.folderId);

      const id = await this.deleteFolderUseCase.execute({
        userId,
        folderId,
      });

      return response.status(200).json({ message: { folderId: id } });
    } catch (error) {
      if (error instanceof ResourceNotFoundError) {
        return response.status(400).json({ message: error.message });
      }
      next(error);
    }
  }
}
