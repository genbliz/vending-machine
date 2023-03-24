import { ICore } from "../core/types";

export interface IProduct extends ICore {
  productName: string;
  amountAvailable: number;
  /*cost (should be in multiples of 5) */
  cost: number;
  sellerId: string;
}
