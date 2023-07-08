import { UserRepository } from "../../repositories/user-respository";
import { FetchUsersByUsersIdController } from "./fetch-users-by-users-id-controller";
import { FetchUsersByUsersIdUseCase } from "./fetch-users-by-users-id-use-case";

const userRepository = new UserRepository();
const fetchUsersByUsersIdUseCase = new FetchUsersByUsersIdUseCase(
  userRepository
);
const fetchUsersByUsersIdController = new FetchUsersByUsersIdController(
  fetchUsersByUsersIdUseCase
);

export { fetchUsersByUsersIdController };
