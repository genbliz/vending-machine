import { ICore } from "../core/types";

export enum UserRolesEnum {
  buyer = "buyer",
  seller = "seller",
}

export const VALID_DEPOSIT_BUY_VALUES = [5, 10, 20, 50, 100];

export interface IUser extends ICore {
  role: string;
  username: string;
  password: string;
  deposit: number;
}
