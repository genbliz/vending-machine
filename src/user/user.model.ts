import { IBaseSchema } from "../core/types";
import Joi from "joi";
import { IUser, UserRolesEnum } from "./user.types";

const validRole = Object.values(UserRolesEnum);

export const userSchema: IBaseSchema<IUser> = {
  id: Joi.string().uuid().required(),
  _id: Joi.string().uuid().required(),
  deposit: Joi.number(),
  password: Joi.string().required(),
  role: Joi.string()
    .required()
    .valid(...validRole),
  username: Joi.string().required(),
  createdAt: Joi.string().isoDate(),
  updatedAt: Joi.string().isoDate(),
};
