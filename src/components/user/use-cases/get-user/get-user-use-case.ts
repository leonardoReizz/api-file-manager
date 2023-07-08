import { ResourceNotFoundError } from "../../../errors/resource-not-found-error";
import { UserRepository } from "../../repositories/user-respository";

export class GetUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(userId: string) {
    const find = await this.userRepository.findById(userId);

    if (!find) {
      throw new ResourceNotFoundError();
    }

    return { user: find };
  }
}
