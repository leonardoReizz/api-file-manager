import { InvalidCredentialsError } from "../../../errors/InvalidCredentialsError";
import { UserRepository } from "../../../user/repositories/user-respository";
import { AuthenticateRequestDTO } from "./authenticate-request-dto";
import { compare } from "bcryptjs";

export class AuthenticateUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(data: AuthenticateRequestDTO) {
    const user = await this.userRepository.findByEmail(data.email);

    if (!user) throw new InvalidCredentialsError();

    const verifyPassword = await compare(data.password, user.hashedPassword);

    if (verifyPassword === false) throw new InvalidCredentialsError();

    const userWithoutPassword: any = { ...user };
    delete userWithoutPassword.hashedPassword;

    return { user: { ...userWithoutPassword } };
  }
}
