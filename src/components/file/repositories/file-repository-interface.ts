export interface ISaveFileData {
  folderId: string;
  file: any;
  userId: string;
}

export interface IFavoriteFileData {
  userId: string;
  folderId: string;
  fileId: string;
}

export interface IDeleteFileData {
  fileId: string;
  userId: string;
  folderId: string;
}

export interface IFileRepository {
  saveFile(data: ISaveFileData): Promise<any>;
  favoriteFile(data: IFavoriteFileData): Promise<any>;
  delete(data: IDeleteFileData): Promise<{ folderId: string; fileId: string }>;
}
