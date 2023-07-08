import { NextFunction, Request, Response } from "express";
import { UnfavoriteFileUseCase } from "./unfavorite-file-use-case";

export class UnfavoriteFileController {
  constructor(private unfavoriteFileUseCase: UnfavoriteFileUseCase) {}

  async handle(request: Request, response: Response, next: NextFunction) {
    try {
      this.unfavoriteFileUseCase.handle({ fileId: "" });
    } catch (error) {
      next(error);
    }
  }
}
