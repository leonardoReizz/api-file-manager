import { FileRepository } from "../../repositories/file-repository";
import { IDeleteFileRequestDTO } from "./delete-file-request-dto";

export class DeleteFileUseCase {
  constructor(private fileRepository: FileRepository) {}

  async execute(data: IDeleteFileRequestDTO) {
    const response = await this.fileRepository.delete(data);
    return response;
  }
}
