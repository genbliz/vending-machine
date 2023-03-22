import { IBaseSchema } from "../core/types";
import { IProduct } from "./product.types";
import Joi from "joi";
import { JoiMultipleOf5 } from "../helpers/joi-helper";

export const productSchema: IBaseSchema<IProduct> = {
  amountAvailable: JoiMultipleOf5(),
  id: Joi.string().uuid().required(),
  _id: Joi.string().uuid().required(),
  cost: Joi.number(),
  productName: Joi.string().required(),
  sellerId: Joi.string().required(),
  createdAt: Joi.string().isoDate(),
  updatedAt: Joi.string().isoDate(),
};
