import { FileRepository } from "../../repositories/file-repository";
import { ISaveFileRequestDTO } from "./save-file-request-dto";

export class SaveFileUseCase {
  constructor(private fileRepository: FileRepository) {}
  async execute(data: ISaveFileRequestDTO) {
    const id = await this.fileRepository.saveFile(data);

    return id;
  }
}
