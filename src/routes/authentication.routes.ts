import { NextFunction, Request, Response, Router } from "express";
import { authenticateController } from "../components/authenticate/use-cases/authenticate";
import { refreshTokenController } from "../components/authenticate/refresh-token";
import { verifyJWTRefreshToken } from "../middlewares/verify-jwt-refresh-token";

const authenticationRoutes = Router();

authenticationRoutes.post(
  "/",
  (request: Request, response: Response, next: NextFunction) => {
    return authenticateController.handle(request, response, next);
  }
);

authenticationRoutes.post(
  "/refresh",
  verifyJWTRefreshToken,
  (request: Request, response: Response, next: NextFunction) => {
    return refreshTokenController.handle(request, response, next);
  }
);

export { authenticationRoutes };
