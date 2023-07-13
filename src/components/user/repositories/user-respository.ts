import { DBUSER, UserProps } from "../model/User";
import { UserRepositoryInterface } from "./user-repository-interface";
import * as t from "./user-repository-interface";

export class UserRepository implements UserRepositoryInterface {
  async update(data: Partial<UserProps>) {
    const updated = (await DBUSER.findOneAndUpdate<UserProps>(
      { _id: data._id },
      { ...data },
      { new: true }
    ).lean()) as UserProps;

    if (updated) {
      const { hashedPassword, ...updatedWithoutHash } = updated;
      return updatedWithoutHash;
    }

    return null;
  }

  async create(data: t.ICreateUserData) {
    const createUser = await DBUSER.create(data);
    await createUser.save();
    return createUser as unknown as UserProps;
  }

  async findByEmail(email: string): Promise<UserProps | null> {
    const query = await DBUSER.findOne({ email }).lean();

    if (!query) return null;

    return query as unknown as UserProps;
  }

  async findById(userId: string): Promise<UserProps | null> {
    const query = await DBUSER.findById({ _id: userId }).lean();

    if (!query) return null;

    const user: any = { ...query };
    delete user.hashedPassword;

    return user;
  }

  async findByIdLock(userId: string): Promise<UserProps | null> {
    const query = await DBUSER.findById({ _id: userId }).lean();

    if (!query) return null;

    const user: any = { ...query };

    return user;
  }
}
