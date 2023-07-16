export interface SaveFileData {
  folderId: string;
  file: any;
  userId: string;
}

export interface FavoriteFileData {
  userId: string;
  folderId: string;
  fileId: string;
}

export interface DeleteFileData {
  fileId: string;
  userId: string;
  folderId: string;
}

export interface FileRepository {
  saveFile(data: SaveFileData): Promise<any>;
  favoriteFile(data: FavoriteFileData): Promise<any>;
  delete(data: DeleteFileData): Promise<{ folderId: string; fileId: string }>;
}
