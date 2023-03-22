import { ICore } from "../core/types";

export interface IProduct extends ICore {
  productName: string;
  amountAvailable: number /*Implement product model with amountAvailable, cost (should be in multiples of 5),
  productName and sellerId fields
   */;
  cost: number;
  sellerId: string;
}
