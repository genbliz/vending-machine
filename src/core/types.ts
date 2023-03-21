import jwt from "jsonwebtoken";
import Joi from "joi";

export interface IAuthUserResult extends Pick<jwt.JwtPayload, "iss" | "sub" | "exp"> {
  id: string;
  role: string[];
  username: string;
}

type ISchemaType<T> = { [P in keyof T]-?: Joi.AnySchema | [Joi.AnySchema, Joi.AnySchema] };

export type IBaseSchema<T> = Pick<ISchemaType<T>, Exclude<keyof ISchemaType<T>, "">>;
