import { FolderRepository } from "../../repositories/folder-repository";
import { CreateFolderController } from "./create-folder-controller";
import { CreateFolderUseCase } from "./create-folder-use-case";

const folderRepository = new FolderRepository();
const createFolderUseCase = new CreateFolderUseCase(folderRepository);
const createFolderController = new CreateFolderController(createFolderUseCase);

export { createFolderController };
