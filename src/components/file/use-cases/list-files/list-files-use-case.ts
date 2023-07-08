import { FolderRepository } from "../../../folders/repositories/folder-repository";

export class ListFilesUseCase {
  constructor(private folderRepository: FolderRepository) {}
  async execute(userId: string) {
    const result = await this.folderRepository.listFolders(userId);

    return { folders: result };
  }
}
