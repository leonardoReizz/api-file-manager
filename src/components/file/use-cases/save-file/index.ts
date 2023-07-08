import { FileRepository } from "../../repositories/file-repository";
import { SaveFileController } from "./save-file-controller";
import { SaveFileUseCase } from "./save-file-use-case";

const fileRepository = new FileRepository();
const saveFileUseCase = new SaveFileUseCase(fileRepository);
const saveFileController = new SaveFileController(saveFileUseCase);

export { saveFileController };
