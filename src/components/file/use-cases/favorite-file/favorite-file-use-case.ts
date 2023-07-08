import { FileRepository } from "../../repositories/file-repository";
import { IFavoriteFileRequestDTO } from "./favorite-file-request-dto";

export class FavoriteFileUseCase {
  constructor(private fileRepository: FileRepository) {}

  async execute(data: IFavoriteFileRequestDTO) {
    const id = await this.fileRepository.favoriteFile(data);
    return id;
  }
}
