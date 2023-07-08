import { FolderRepository } from "../../repositories/folder-repository";
import { IUnpinFolderRequestDTO } from "./unpin-folder-request-dto";

export class UnpinFolderUseCase {
  constructor(private folderRepository: FolderRepository) {}
  async handle(data: IUnpinFolderRequestDTO) {
    const id = await this.folderRepository.unpinFolder(data);

    return id;
  }
}
