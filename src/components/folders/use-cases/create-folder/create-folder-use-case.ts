import { FolderRepository } from "../../repositories/folder-repository";
import { ICreateFolderRequestDTO } from "./create-folder-request-dto";
import { v4 as uuid } from "uuid";

export class CreateFolderUseCase {
  constructor(private folderRepository: FolderRepository) {}
  async execute({ userId, name }: ICreateFolderRequestDTO) {
    const folderId = uuid();
    const folder = folderId + "_" + name;

    await this.folderRepository.createFolder({
      folderName: folder,
      userId,
    });

    return { folderId, folderName: name, folder };
  }
}
