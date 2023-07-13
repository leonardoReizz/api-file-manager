import { UserRepository } from "../../repositories/user-respository";
import { UpdateUserInfoController } from "./update-user-info-controller";
import { UpdateUserInfoUseCase } from "./update-user-info-use-case";

const userRepository = new UserRepository();
const updateUserInfoUseCase = new UpdateUserInfoUseCase(userRepository);
const updateUserInfoController = new UpdateUserInfoController(
  updateUserInfoUseCase
);

export { updateUserInfoController };
