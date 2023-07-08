import { FolderRepository } from "../../repositories/folder-repository";
import { DeleteFolderController } from "./delete-folder-controller";
import { DeleteFolderUseCase } from "./delete-folder-use-case";

const folderRepository = new FolderRepository();
const deleteFolderUseCase = new DeleteFolderUseCase(folderRepository);
const deleteFolderController = new DeleteFolderController(deleteFolderUseCase);

export { deleteFolderController };
