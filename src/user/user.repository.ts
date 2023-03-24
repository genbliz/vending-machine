import { BaseRepository } from "../core/base-repository";
import { userSchema } from "./user.model";
import { IUser } from "./user.types";

class UserRepositoryBase extends BaseRepository<IUser> {
  constructor() {
    super({ schema: userSchema, tableName: "users" });
  }

  getByUserName(username: string) {
    return this.findOne({ username });
  }
}

export const UserRepository = new UserRepositoryBase();
