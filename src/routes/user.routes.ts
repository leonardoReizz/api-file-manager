import { NextFunction, Request, Response, Router } from "express";
import { createUserController } from "../components/user/use-cases/create-user";
import { getUserController } from "../components/user/use-cases/get-user";
import { verifyJWT } from "../middlewares/verify-jwt";

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

export { userRoutes };
