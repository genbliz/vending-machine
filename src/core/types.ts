import jwt from "jsonwebtoken";
import Joi from "joi";

export interface ICore<T = string> {
  id: T;
  createdAt: string | Date;
  updatedAt: string | Date;
}

export interface IAuthUserResult extends Pick<Partial<jwt.JwtPayload>, "iss" | "sub" | "exp"> {
  userId: string;
  role: string;
  username: string;
}

export type ISchemaType<T> = { [P in keyof T]-?: Joi.AnySchema | [Joi.AnySchema, Joi.AnySchema] };

export type IBaseSchema<T> = Pick<ISchemaType<T>, Exclude<keyof ISchemaType<T>, "">>;
