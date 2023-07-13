import { EmailAlreadyExists } from "../../../errors/EmailAlreadyExists";
import { ResourceNotFoundError } from "../../../errors/resource-not-found-error";
import { UserRepository } from "../../repositories/user-respository";
import { IUpdateUserInfoRequestDTO } from "./update-user-info-request-dto";

export class UpdateUserInfoUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(data: IUpdateUserInfoRequestDTO) {
    const findId = await this.userRepository.findById(data.id);
    if (!findId) throw new ResourceNotFoundError();

    if (data.email) {
      const findEmail = await this.userRepository.findByEmail(data.email);
      if (findEmail?._id.toString() !== data.id && findEmail)
        throw new EmailAlreadyExists();
    }

    const updated = await this.userRepository.update({ _id: data.id, ...data });
    return { user: updated };
  }
}
