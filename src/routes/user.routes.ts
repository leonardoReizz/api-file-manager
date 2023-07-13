import { NextFunction, Request, Response, Router } from "express";
import { createUserController } from "../components/user/use-cases/create-user";
import { getUserController } from "../components/user/use-cases/get-user";
import { verifyJWT } from "../middlewares/verify-jwt";
import { updateUserInfoController } from "../components/user/use-cases/update-user-info";
import { changePasswordController } from "../components/user/use-cases/change-password";

const userRoutes = Router();

userRoutes.post(
  "/",
  (request: Request, response: Response, next: NextFunction) => {
    return createUserController.handle(request, response, next);
  }
);

userRoutes.get(
  "/",
  verifyJWT,
  (request: Request, response: Response, next: NextFunction) => {
    return getUserController.handle(request, response, next);
  }
);

userRoutes.put(
  "/",
  verifyJWT,
  (request: Request, response: Response, next: NextFunction) => {
    return updateUserInfoController.handle(request, response, next);
  }
);

userRoutes.put(
  "/changePassword",
  verifyJWT,
  (request: Request, response: Response, next: NextFunction) => {
    return changePasswordController.handle(request, response, next);
  }
);

export { userRoutes };
