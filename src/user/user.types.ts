import { ICore } from "../core/types";

export enum UserRole {
  buyer = "buyer",
}

export interface IUser extends ICore {
  role: string;
  username: string;
  password: string;
  deposit: number;
}
