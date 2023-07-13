import { UserRepository } from "../../repositories/user-respository";
import { ChangePasswordController } from "./change-password-controller";
import { ChangePasswordUseCase } from "./change-password-use-case";

const userRepository = new UserRepository();
const changePasswordUseCase = new ChangePasswordUseCase(userRepository);
const changePasswordController = new ChangePasswordController(
  changePasswordUseCase
);

export { changePasswordController };
