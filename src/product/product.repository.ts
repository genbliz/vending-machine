import { BaseRepository } from "../core/base-repository";
import { productSchema } from "./product.model";
import { IProduct } from "./product.types";

class ProductRepositoryBase extends BaseRepository<IProduct> {
  constructor() {
    super({ schema: productSchema, tableName: "products" });
  }
}

export const ProductRepository = new ProductRepositoryBase();
