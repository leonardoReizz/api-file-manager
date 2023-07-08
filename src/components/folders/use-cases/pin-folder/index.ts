import { FolderRepository } from "../../repositories/folder-repository";
import { PinFolderController } from "./pin-folder-controller";
import { PinFolderUseCase } from "./pin-folder-use-case";

const folderRepository = new FolderRepository();

const pinFolderUseCase = new PinFolderUseCase(folderRepository);
const pinFolderController = new PinFolderController(pinFolderUseCase);

export { pinFolderController };
