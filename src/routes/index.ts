import { Router } from "express";
import { authenticationRoutes } from "./authentication.routes";
import { fileRoutes } from "./file.routes";
import { userRoutes } from "./user.routes";
import { folderRoutes } from "./folder.routes";

const routes = Router();

routes.use("/authenticate", authenticationRoutes);
routes.use("/user", userRoutes);
routes.use("/file", fileRoutes);
routes.use("/folder", folderRoutes);

export { routes };
