export interface IFolderData {
  folder: string;
  folderId: string;
  folderName: string;
  pinned: boolean;
  files: {
    file: string;
    fileName: string;
    fileId: string;
  }[];
}

export interface IPinFolderData {
  userId: string;
  folderId: string;
}

export interface IUnpinFolderData {
  folderId: string;
  userId: string;
}

export interface IDeleteFolderData {
  folderId: string;
  userId: string;
}

export interface ICreateFolderData {
  userId: string;
  folderName: string;
}

export interface IFolderRepositoryInterface {
  listFolders: (userId: string) => Promise<IFolderData[]>;
  pinFolder: (data: IPinFolderData) => Promise<string>;
  unpinFolder: (data: IUnpinFolderData) => Promise<string>;
  deleteFolder: (data: IDeleteFolderData) => Promise<string>;
  createFolder: (data: ICreateFolderData) => Promise<void>;
}
