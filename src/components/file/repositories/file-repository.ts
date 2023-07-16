import * as t from "./file-repository-interface";
import { v4 as uuid } from "uuid";
import fs from "fs";
import path from "path";
import { env } from "../../../env";

export class FileRepository implements t.FileRepository {
  async saveFile(data: t.SaveFileData) {
    const tempPath = data.file.path;
    const id = uuid();
    let targetPath: string = "";

    if (data.folderId !== "Root") {
      fs.readdirSync(env.MAIN_DIR + data.userId).forEach((item) => {
        if (item.startsWith(data.folderId)) {
          const itemPath = path.join(env.MAIN_DIR + data.userId, item);

          targetPath = `${itemPath}/${id}_${data.file.originalname}`;

          fs.rename(tempPath, targetPath, (error) => {
            if (error) {
              console.log("Erro ao salvar arquivo", error);
              throw error;
            }
          });
        }
      });

      return {
        file: `${id}_${data.file.originalname}`,
        fileId: id,
        extension: path.extname(data.file.originalname),
        favorited: false,
        fileName: path.basename(data.file.originalname),
      };
    }

    targetPath = `${env.MAIN_DIR}${data.userId}/${id}_${data.file.originalname}`;

    fs.rename(tempPath, targetPath, (error) => {
      if (error) {
        console.log("Erro ao salvar arquivo", error);
        throw error;
      }
    });

    return {
      file: `${id}_${data.file.originalname}`,
      fileId: id,
      extension: path.extname(data.file.originalname),
      favorited: false,
      fileName: path.basename(data.file.originalname),
    };
  }

  async favoriteFile(data: t.FavoriteFileData) {
    const directoryPath = env.MAIN_DIR + data.userId;

    if (data.folderId === "Root") {
      fs.readdirSync(directoryPath).forEach((file) => {
        if (file.startsWith(data.fileId)) {
          const oldPath = `${directoryPath}/${file}`;
          const newPath = `${directoryPath}/favorite_${file}`;
          fs.rename(oldPath, newPath, (err) => {
            if (err) {
              console.error("Error favorite file:", err);
            }
          });
        }
      });
      return data.fileId;
    }
    fs.readdirSync(directoryPath).forEach((folder) => {
      if (folder.includes(data.folderId)) {
        const folderPath = path.join(directoryPath, folder);
        if (fs.statSync(folderPath).isDirectory()) {
          fs.readdirSync(folderPath).forEach((file) => {
            if (file.includes(data.fileId)) {
              const oldPath = `${folderPath}/${file}`;
              const newPath = `${folderPath}/favorite_${file}`;
              fs.rename(oldPath, newPath, (err) => {
                if (err) {
                  console.error("Error favorite file:", err);
                }
              });
            }
          });
        }
      }
    });
    return data.fileId;
  }

  async delete(data: t.DeleteFileData) {
    const directoryPath = env.MAIN_DIR + data.userId;

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
    const directoryPath = env.MAIN_DIR + data.userId;

    if (data.folderId === "Root") {
      fs.readdirSync(directoryPath).forEach((file) => {
        if (file.includes(data.fileId)) {
          const oldPath = `${directoryPath}/${file}`;
          const newFileName = `${file.split("_")[1]}_${file.split("_")[2]}`;
          const newPath = `${directoryPath}/${newFileName}`;

          fs.rename(oldPath, newPath, (err) => {
            if (err) {
              console.error("Error unfavorite file:", err);
            }
          });
        }
      });
    } else {
      fs.readdirSync(directoryPath).forEach((folder) => {
        if (folder.includes(data.folderId)) {
          const folderPath = path.join(directoryPath, folder);
          if (fs.statSync(folderPath).isDirectory()) {
            fs.readdirSync(folderPath).forEach((file) => {
              if (file.includes(data.fileId)) {
                const oldPath = `${folderPath}/${file}`;
                const newFileName = `${file.split("_")[1]}_${
                  file.split("_")[2]
                }`;
                const newPath = `${folderPath}/${newFileName}`;

                fs.rename(oldPath, newPath, (err) => {
                  if (err) {
                    console.error("Error unfavorite file:", err);
                  }
                });
              }
            });
          }
        }
      });
    }

    return data.file;
  }
}
