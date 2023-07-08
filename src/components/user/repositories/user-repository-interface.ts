import { UserProps } from "../model/User";

export interface ICreateUserData {
  fullName: string;
  email: string;
  hashedPassword: string;
}

export interface UserRepositoryInterface {
  create(data: ICreateUserData): Promise<UserProps>;
  findByEmail(email: string): Promise<UserProps | null>;
  findById(userId: string): Promise<UserProps | null>;
}
