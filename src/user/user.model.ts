import { IBaseSchema } from "../core/types";
import Joi from "joi";
import { IUser, UserRolesEnum } from "./user.types";

const validRole = Object.values(UserRolesEnum);

export const userSchema: IBaseSchema<IUser> = {
  _id: Joi.string().uuid().required(),
  deposit: Joi.number().min(0).default(0),
  password: Joi.string().required(),
  role: Joi.string()
    .required()
    .valid(...validRole),
  username: Joi.string().required(),
  createdAt: Joi.string().isoDate(),
  updatedAt: Joi.string().isoDate(),
};
