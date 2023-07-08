import { FolderRepository } from "../../repositories/folder-repository";
import { IPinFolderRequestDTO } from "./pin-folder-request-dto";

export class PinFolderUseCase {
  constructor(private folderRepository: FolderRepository) {}
  async handle(data: IPinFolderRequestDTO) {
    const id = await this.folderRepository.pinFolder(data);

    return id;
  }
}
