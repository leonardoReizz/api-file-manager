import { NextFunction, Request, Response, Router } from "express";
import { verifyJWT } from "../middlewares/verify-jwt";
import { createFolderController } from "../components/upload/use-cases/create-folder";
import { deleteFolderController } from "../components/upload/use-cases/delete-folder";
import { pinFolderController } from "../components/upload/use-cases/pin-folder";
import { unpinFolderController } from "../components/upload/use-cases/unpin-folder";

const fileRoutes = Router();

fileRoutes.post(
  "/folder",
  verifyJWT,
  (request: Request, response: Response, next: NextFunction) => {
    return createFolderController.handle(request, response, next);
  }
);

fileRoutes.delete(
  "/folder/:folderId",
  verifyJWT,
  (request: Request, response: Response, next: NextFunction) => {
    return deleteFolderController.handle(request, response, next);
  }
);

fileRoutes.post(
  "/folder/pin/:folderId",
  verifyJWT,
  (request: Request, response: Response, next: NextFunction) => {
    return pinFolderController.handle(request, response, next);
  }
);

fileRoutes.post(
  "/folder/unpin/:folderId",
  verifyJWT,
  (request: Request, response: Response, next: NextFunction) => {
    return unpinFolderController.handle(request, response, next);
  }
);

export { fileRoutes };
