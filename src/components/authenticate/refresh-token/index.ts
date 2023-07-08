import { UserRepository } from "../../user/repositories/user-respository";
import { RefreshTokenController } from "./refresh-token-controller";
import { RefreshTokenUseCase } from "./refresh-token-use-case";

const userRepository = new UserRepository();
const refreshTokenUseCase = new RefreshTokenUseCase(userRepository);
const refreshTokenController = new RefreshTokenController(refreshTokenUseCase);

export { refreshTokenController };
