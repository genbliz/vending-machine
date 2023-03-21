export interface IProduct {
  id: string;
  productName: string;
  amountAvailable: number /*Implement product model with amountAvailable, cost (should be in multiples of 5),
  productName and sellerId fields
   */;
  cost: number;
  sellerId: string;
  createdAt: string | Date;
  updatedAt: string | Date;
}
