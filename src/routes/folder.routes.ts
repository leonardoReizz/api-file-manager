import { NextFunction, Request, Response, Router } from "express";
import { verifyJWT } from "../middlewares/verify-jwt";
import { createFolderController } from "../components/folders/use-cases/create-folder";
import { deleteFolderController } from "../components/folders/use-cases/delete-folder";
import { pinFolderController } from "../components/folders/use-cases/pin-folder";
import { unpinFolderController } from "../components/folders/use-cases/unpin-folder";

const folderRoutes = Router();

folderRoutes.post(
  "/",
  verifyJWT,
  (request: Request, response: Response, next: NextFunction) => {
    return createFolderController.handle(request, response, next);
  }
);

folderRoutes.delete(
  "/:folderId",
  verifyJWT,
  (request: Request, response: Response, next: NextFunction) => {
    return deleteFolderController.handle(request, response, next);
  }
);

folderRoutes.post(
  "/pin/:folderId",
  verifyJWT,
  (request: Request, response: Response, next: NextFunction) => {
    return pinFolderController.handle(request, response, next);
  }
);

folderRoutes.post(
  "/unpin/:folderId",
  verifyJWT,
  (request: Request, response: Response, next: NextFunction) => {
    return unpinFolderController.handle(request, response, next);
  }
);

export { folderRoutes };
