export interface IUser {
  id: string;
  role: string;
  username: string;
  password: string;
  deposit: number;
  createdAt: string | Date;
  updatedAt: string | Date;
}
