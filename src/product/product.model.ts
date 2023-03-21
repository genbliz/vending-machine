import { IBaseSchema } from "../core/types";
import { IProduct } from "./product.types";
import Joi from "joi";

export const productSchema: IBaseSchema<IProduct> = {
  amountAvailable: Joi.number(),
  id: Joi.string().uuid().required(),
  cost: Joi.number(),
  productName: Joi.string().required(),
  sellerId: Joi.string().required(),
  createdAt: Joi.string().isoDate(),
  updatedAt: Joi.string().isoDate(),
};
