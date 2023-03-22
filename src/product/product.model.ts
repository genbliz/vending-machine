import { IBaseSchema } from "../core/types";
import { IProduct } from "./product.types";
import Joi from "joi";
import { JoiMultipleOf5 } from "../helpers/joi-helper";

export const productSchema: IBaseSchema<IProduct> = {
  id: Joi.string().uuid().required(),
  _id: Joi.string().uuid().required(),
  productName: Joi.string().required(),
  //
  cost: JoiMultipleOf5(),
  amountAvailable: JoiMultipleOf5(),
  //
  sellerId: Joi.string().uuid().required(),
  createdAt: Joi.string().isoDate(),
  updatedAt: Joi.string().isoDate(),
};
