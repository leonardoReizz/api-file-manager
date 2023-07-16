import { Router } from "express";
import { authenticationRoutes } from "./authentication.routes";
import { fileRoutes } from "./file.routes";
import { userRoutes } from "./user.routes";
import { folderRoutes } from "./folder.routes";

import swaggerUi from "swagger-ui-express";
import swaggerDocument from "../../swagger-output.json";

const routes = Router();

routes.use("/authenticate", authenticationRoutes);
routes.use("/user", userRoutes);
routes.use("/file", fileRoutes);
routes.use("/folder", folderRoutes);

routes.use("/docs", swaggerUi.serve);
routes.get("/docs", swaggerUi.setup(swaggerDocument));

export { routes };
