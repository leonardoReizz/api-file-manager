import { FileRepository } from "../../repositories/file-repository";
import { UnfavoriteFileController } from "./unfavorite-file-controller";
import { UnfavoriteFileUseCase } from "./unfavorite-file-use-case";

const fileRepository = new FileRepository();
const unfavoriteFileUseCase = new UnfavoriteFileUseCase(fileRepository);
const unfavoriteFileController = new UnfavoriteFileController(
  unfavoriteFileUseCase
);

export { unfavoriteFileController };
