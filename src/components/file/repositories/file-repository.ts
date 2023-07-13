import * as t from "./file-repository-interface";
import { v4 as uuid } from "uuid";
import fs from "fs";
import path from "path";
import { env } from "../../../env";

export class FileRepository implements t.IFileRepository {
  async saveFile(data: t.ISaveFileData): Promise<string> {
    const tempPath = data.file.path;
    const id = uuid();

    if (data.folderId !== "Root") {
      fs.readdirSync(env.MAIN_DIR + data.userId).forEach((item) => {
        if (item.startsWith(data.folderId)) {
          const itemPath = path.join(env.MAIN_DIR + data.userId, item);

          const targetPath = `${itemPath}/${id}_${data.file.originalname}`;

          fs.rename(tempPath, targetPath, (error) => {
            if (error) {
              console.log("Erro ao salvar arquivo", error);
              throw error;
            }
          });
        }
      });
    } else {
      const targetPath = `${env.MAIN_DIR}${data.userId}/${id}_${data.file.originalname}`;

      fs.rename(tempPath, targetPath, (error) => {
        if (error) {
          console.log("Erro ao salvar arquivo", error);
          throw error;
        }
      });
    }

    return id;
  }

  async favoriteFile(data: t.IFavoriteFileData) {
    const directoryPath = env.MAIN_DIR + data.userId;

    fs.readdir(directoryPath, (err, files) => {
      if (err) {
        console.error("Erro ao ler o diretório:", err);
        return;
      }

      for (const file of files) {
        if (file.startsWith(`${data.fileId}`)) {
          const oldPath = `${directoryPath}/${file}`;
          const newPath = `${directoryPath}/favorite_${file}`;

          fs.rename(oldPath, newPath, (err) => {
            if (err) {
              console.error("Error favorite file:", err);
            }
          });

          return;
        }
      }
    });

    return data.fileId;
  }

  async delete(data: t.IDeleteFileData) {
    const directoryPath = env.MAIN_DIR + data.userId;

    console.log(data);
    if (data.folderId === "Root") {
      fs.readdirSync(directoryPath).forEach((file) => {
        if (file.startsWith(data.fileId)) {
          const filePath = path.join(directoryPath, file);
          fs.unlinkSync(filePath);
        }
      });
    } else {
      fs.readdirSync(directoryPath).forEach((folder) => {
        if (folder.includes(data.folderId)) {
          const folderPath = path.join(directoryPath, folder);
          if (fs.statSync(folderPath).isDirectory()) {
            fs.readdirSync(folderPath).forEach((file) => {
              if (file.includes(data.fileId)) {
                const filePath = path.join(folderPath, file);
                fs.unlinkSync(filePath);
              }
            });
          }
        }
      });
    }

    return { fileId: data.fileId, folderId: data.folderId };
  }

  async unfavoriteFile(data: any) {
    let directoryPath = "";
    if (data.folderId === "Root") {
      directoryPath = env.MAIN_DIR + data.userId;
    } else {
      directoryPath = env.MAIN_DIR + data.userId + "/" + data.folderId;
    }

    fs.readdir(directoryPath, (err, files) => {
      if (err) {
        console.error("Erro ao ler o diretório:", err);
        return;
      }

      for (const file of files) {
        console.log(file, "achei", data.fileId);
        if (file.startsWith(`favorite_${data.fileId}`)) {
          const oldPath = `${directoryPath}/${file}`;
          const newFileName = `${file.split("_")[1]}_${file.split("_")[2]}`;
          const newPath = `${directoryPath}/${newFileName}`;

          fs.rename(oldPath, newPath, (err) => {
            if (err) {
              console.error("Error unfavorite file:", err);
            }
          });

          return;
        }
      }
    });

    return data.file;
  }
}
