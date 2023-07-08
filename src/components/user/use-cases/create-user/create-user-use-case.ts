import { env } from "../../../../env";
import { EmailAlreadyExists } from "../../../errors/EmailAlreadyExists";
import { generateHashedPassword } from "../../../utils/generate-hashed-password";
import { UserRepository } from "../../repositories/user-respository";
import { ICreateUserRequestDTO } from "./create-user-request-dto";
import fs from "fs";

export class CreateUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(data: ICreateUserRequestDTO) {
    const emailAlreadyExists = await this.userRepository.findByEmail(
      data.email
    );

    if (emailAlreadyExists) throw new EmailAlreadyExists();

    const hashedPassword = await generateHashedPassword(data.password);

    const create = await this.userRepository.create({
      ...data,
      hashedPassword,
    });

    const dir = env.MAIN_DIR + `${create._id}`;

    fs.mkdirSync(dir); // TODO: error?

    return { user: create };
  }
}
