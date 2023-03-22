import { IBaseSchema } from "../core/types";
import Joi from "joi";
import { IUser } from "./user.types";

export const userSchema: IBaseSchema<IUser> = {
  id: Joi.string().uuid().required(),
  _id: Joi.string().uuid().required(),
  deposit: Joi.number(),
  password: Joi.string().required(),
  role: Joi.string().required(),
  username: Joi.string().required(),
  createdAt: Joi.string().isoDate(),
  updatedAt: Joi.string().isoDate(),
};
