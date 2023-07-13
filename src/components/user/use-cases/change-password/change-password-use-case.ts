import { compare } from "bcryptjs";
import { ResourceNotFoundError } from "../../../errors/resource-not-found-error";
import { UserRepository } from "../../repositories/user-respository";
import { IChangePasswordRequestDTO } from "./change-password-request-dto";
import { InvalidCredentialsError } from "../../../errors/InvalidCredentialsError";
import { generateHashedPassword } from "../../../utils/generate-hashed-password";

export class ChangePasswordUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(data: IChangePasswordRequestDTO) {
    const user = await this.userRepository.findByIdLock(data.userId);

    if (!user) throw new ResourceNotFoundError();

    const verifyPassword = await compare(
      data.currentPassword,
      user.hashedPassword
    );

    if (verifyPassword === false) throw new InvalidCredentialsError();

    const hashedPassword = await generateHashedPassword(data.newPassword);
    const updated = await this.userRepository.update({
      _id: data.userId,
      hashedPassword,
    });

    return { user: updated };
  }
}
