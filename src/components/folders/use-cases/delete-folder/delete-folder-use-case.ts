import { FolderRepository } from "../../repositories/folder-repository";
import { IDeleteFolderRequestDTO } from "./delete-folder-request-dto";

export class DeleteFolderUseCase {
  constructor(private folderRepository: FolderRepository) {}
  async execute(data: IDeleteFolderRequestDTO) {
    const id = await this.folderRepository.deleteFolder(data);
    return id;
  }
}
