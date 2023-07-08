import { ResourceNotFoundError } from "../../../errors/resource-not-found-error";
import { UserRepository } from "../../repositories/user-respository";
import { FetchUsersByUsersIdRequestDTO } from "./fetch-users-by-users-id-request-dto";

export class FetchUsersByUsersIdUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(data: FetchUsersByUsersIdRequestDTO) {
    const users = await Promise.all(
      data.usersId.map(async (userId) => {
        return await this.userRepository.findById(userId);
      })
    ).then((user) => {
      return user;
    });

    return { users: users || [] };
  }
}
