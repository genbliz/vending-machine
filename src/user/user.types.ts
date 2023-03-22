import { ICore } from "../core/types";

export enum UserRolesEnum {
  buyer = "buyer",
}

export interface IUser extends ICore {
  role: string;
  username: string;
  password: string;
  deposit: number;
}
