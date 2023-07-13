import { FileRepository } from "../../repositories/file-repository";
import { DeleteFileController } from "./delete-file-controller";
import { DeleteFileUseCase } from "./delete-file-use-case";

const fileRepository = new FileRepository();
const deleteFileUseCase = new DeleteFileUseCase(fileRepository);
const deleteFileController = new DeleteFileController(deleteFileUseCase);

export { deleteFileController };
