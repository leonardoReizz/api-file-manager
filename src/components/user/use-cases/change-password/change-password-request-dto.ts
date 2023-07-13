export interface IChangePasswordRequestDTO {
  userId: string;
  currentPassword: string;
  newPassword: string;
}
