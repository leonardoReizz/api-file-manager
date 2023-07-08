import { FileRepository } from "../../repositories/file-repository";
import { FavoriteFileController } from "./favorite-file-controller";
import { FavoriteFileUseCase } from "./favorite-file-use-case";

const fileRepository = new FileRepository();
const favoriteFileUseCase = new FavoriteFileUseCase(fileRepository);
const favoriteFileController = new FavoriteFileController(favoriteFileUseCase);

export { favoriteFileController };
