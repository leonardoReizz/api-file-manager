import fs from "fs";
import path from "path";
import * as t from "./folder-repository-interface";
import { env } from "../../../env";

export class FolderRepository implements t.IFolderRepositoryInterface {
  async createFolder(data: t.ICreateFolderData) {
    const directoryPath = env.MAIN_DIR + data.userId;

    const fullDirectory = path.join(directoryPath, data.folderName);

    fs.mkdir(fullDirectory, (error) => {
      if (error) {
        console.log(error);
        throw error;
      }
    });
  }

  async deleteFolder(data: t.IDeleteFolderData) {
    const directoryPath = env.MAIN_DIR + data.userId;

    fs.readdirSync(directoryPath).forEach((item) => {
      if (item.startsWith(data.folderId)) {
        const itemPath = path.join(directoryPath, item);
        if (fs.statSync(itemPath).isDirectory()) {
          fs.rmdirSync(itemPath, { recursive: true });
        }
      }
    });

    return data.folderId;
  }

  async listFolders(userId: string) {
    const directoryPath = env.MAIN_DIR + userId;
    const result: t.IFolderData[] = [];

    const files = await fs.promises.readdir(directoryPath);

    const rootFolderObject: any = {
      folder: "Root",
      folderName: "Root",
      folderId: "Root",
      files: [],
    };

    for (const file of files) {
      const filePath = path.join(directoryPath, file);

      const fileStats = await fs.promises.stat(filePath);

      if (fileStats.isFile()) {
        const fileExtension = path.extname(file);
        let fileObject;

        if (file.split("_")[0] === "favorite") {
          fileObject = {
            file,
            fileId: file.split("_")[1],
            fileName: file.split("_").pop() || "",
            favorited: true,
            extension: fileExtension,
          };
        } else {
          fileObject = {
            file,
            fileId: file.split("_")[0],
            fileName: file.split("_").pop() || "",
            favorited: false,
            extension: fileExtension,
          };
        }

        rootFolderObject.files.push(fileObject);
      }
    }

    result.push(rootFolderObject);

    const folders = await fs.promises.readdir(directoryPath);

    for (const folder of folders) {
      const folderPath = path.join(directoryPath, folder);

      const folderStats = await fs.promises.stat(folderPath);

      if (folderStats.isDirectory()) {
        let folderObject: t.IFolderData;

        if (folder.split("_")[0] === "pinned") {
          folderObject = {
            folder,
            folderName: folder.split("_").pop() || "",
            pinned: true,
            folderId: folder.split("_")[1],
            files: [],
          };
        } else {
          folderObject = {
            folder,
            folderName: folder.split("_").pop() || "",
            pinned: false,
            folderId: folder.split("_")[0],
            files: [],
          };
        }

        const files = await fs.promises.readdir(folderPath);

        for (const file of files) {
          const filePath = path.join(folderPath, file);

          const fileStats = await fs.promises.stat(filePath);

          if (fileStats.isFile()) {
            const fileExtension = path.extname(file);
            const fileId = file.split("_")[0];
            const fileName = file.split("_").pop() || "";
            const fileObject = {
              file,
              fileId,
              fileName,
              extension: fileExtension,
            };

            folderObject.files.push(fileObject);
          }
        }

        result.push(folderObject);
      }
    }

    return result;
  }

  async pinFolder(data: t.IPinFolderData) {
    const directoryPath = env.MAIN_DIR + data.userId;

    fs.readdir(directoryPath, (err, arquivos) => {
      if (err) {
        console.error("Erro ao ler o diretório:", err);
        return;
      }

      for (const arquivo of arquivos) {
        const nomePasta = arquivo.split("_")[1]; // Extrai o nome da pasta do nome do arquivo

        console.log(nomePasta);
        if (nomePasta && arquivo.startsWith(`${data.folderId}`)) {
          const oldPath = `${directoryPath}/${arquivo}`;
          const newPath = `${directoryPath}/pinned_${arquivo}`;

          fs.rename(oldPath, newPath, (err) => {
            if (err) {
              console.error("Erro ao renomear a pasta:", err);
            } else {
              console.log("Pasta renomeada com sucesso!");
            }
          });

          return;
        }
      }
    });

    return data.folderId;
  }

  async unpinFolder(data: t.IUnpinFolderData) {
    const directoryPath = env.MAIN_DIR + data.userId;

    fs.readdir(directoryPath, (err, files) => {
      if (err) {
        console.error("Erro ao ler o diretório:", err);
        throw err;
      }

      for (const file of files) {
        if (file.split("_")[0] === "pinned") {
          if (file.startsWith(`pinned_${data.folderId}`)) {
            const oldFolder = `${directoryPath}/${file}`;
            const newNameFolder = `${file.split("_")[1]}_${file.split("_")[2]}`;
            const newFolder = `${directoryPath}/${newNameFolder}`;

            fs.rename(oldFolder, newFolder, (err) => {
              if (err) {
                console.error("Erro ao renomear a pasta:", err);
                throw err;
              }
            });

            return;
          }
        }
      }
    });
    return data.folderId;
  }
}
