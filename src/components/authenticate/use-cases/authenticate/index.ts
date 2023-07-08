import { UserRepository } from "../../../user/repositories/user-respository";
import { AuthenticateController } from "./authenticate-controller";
import { AuthenticateUseCase } from "./authenticate-use-case";

const userRepository = new UserRepository();
const authenticateUseCase = new AuthenticateUseCase(userRepository);
const authenticateController = new AuthenticateController(authenticateUseCase);

export { authenticateController };
