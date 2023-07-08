import { FileRepository } from "../../repositories/file-repository";
import { IUnfavoriteFileRequestDTO } from "./unfavorite-file-request-dto";

export class UnfavoriteFileUseCase {
  constructor(private fileRepository: FileRepository) {}

  async execute(data: IUnfavoriteFileRequestDTO) {
    const id = await this.fileRepository.unfavoriteFile(data);
    return id;
  }
}
