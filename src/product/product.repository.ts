import { BaseRepository } from "../core/base-repository";
import { productSchema } from "./product.model";
import { IProduct } from "./product.types";

class ProductRepositoryBase extends BaseRepository<IProduct> {
  constructor() {
    super({ schema: productSchema, tableName: "products" });
  }

  async getByIdForSeller({ dataId, sellerId }: { dataId: string; sellerId: string }) {
    const result = await super.findOne({ id: dataId, sellerId });
    return result;
  }
}

export const ProductRepository = new ProductRepositoryBase();
