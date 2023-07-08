import { FolderRepository } from "../../../folders/repositories/folder-repository";
import { ListFilesController } from "./list-files-controller";
import { ListFilesUseCase } from "./list-files-use-case";

const folderRepository = new FolderRepository();
const listFilesUseCase = new ListFilesUseCase(folderRepository);
const listFilesController = new ListFilesController(listFilesUseCase);

export { listFilesController };
