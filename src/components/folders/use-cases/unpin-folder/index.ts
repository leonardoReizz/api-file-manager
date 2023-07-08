import { FolderRepository } from "../../repositories/folder-repository";
import { UnpinFolderController } from "./unpin-folder-controller";
import { UnpinFolderUseCase } from "./unpin-folder-use-case";

const folderRepository = new FolderRepository();
const unpinFolderUseCase = new UnpinFolderUseCase(folderRepository);
const unpinFolderController = new UnpinFolderController(unpinFolderUseCase);

export { unpinFolderController };
