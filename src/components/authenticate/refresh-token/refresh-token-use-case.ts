import { InvalidCredentialsError } from "../../errors/InvalidCredentialsError";
import { UserRepository } from "../../user/repositories/user-respository";

export class RefreshTokenUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(id: string) {
    const findUser = await this.userRepository.findById(id);

    if (!findUser) {
      throw new InvalidCredentialsError();
    }

    return { user: findUser };
  }
}
