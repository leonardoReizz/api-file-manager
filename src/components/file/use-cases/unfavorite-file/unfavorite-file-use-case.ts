import { FileRepository } from "../../repositories/file-repository";
import { IUnfavoriteFileRequestDTO } from "./unfavorite-file-request-dto";

export class UnfavoriteFileUseCase {
  constructor(private fileRepository: FileRepository) {}

  async handle(data: IUnfavoriteFileRequestDTO) {}
}
