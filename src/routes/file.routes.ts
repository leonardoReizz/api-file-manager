import { NextFunction, Request, Response, Router } from "express";
import { saveFileController } from "../components/file/use-cases/save-file";
import multer from "multer";
import { listFilesController } from "../components/file/use-cases/list-files";
import { verifyJWT } from "../middlewares/verify-jwt";
import { favoriteFileController } from "../components/file/use-cases/favorite-file";
import { unfavoriteFileController } from "../components/file/use-cases/unfavorite-file";

const upload = multer({ dest: "uploads/" });

const fileRoutes = Router();

fileRoutes.post(
  "/upload/:folderId",
  [upload.single("file"), verifyJWT],
  (request: Request, response: Response, next: NextFunction) => {
    return saveFileController.handle(request, response, next);
  }
);

fileRoutes.get(
  "/",
  verifyJWT,
  (request: Request, response: Response, next: NextFunction) => {
    return listFilesController.handle(request, response, next);
  }
);

fileRoutes.put(
  "/favorite/:folderId/:fileId",
  verifyJWT,
  (request: Request, response: Response, next: NextFunction) => {
    return favoriteFileController.handle(request, response, next);
  }
);

fileRoutes.put(
  "/unfavorite/:folderId/:fileId",
  verifyJWT,
  (request: Request, response: Response, next: NextFunction) => {
    return unfavoriteFileController.handle(request, response, next);
  }
);
export { fileRoutes };
