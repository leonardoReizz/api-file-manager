import { FileRepository } from "../../repositories/file-repository";
import { ISaveFileRequestDTO } from "./save-file-request-dto";
export class SaveFileUseCase {
  constructor(private fileRepository: FileRepository) {}
  async execute(data: ISaveFileRequestDTO) {
    const file = await this.fileRepository.saveFile(data);

    return { file, folderId: data.folderId };
  }
}
