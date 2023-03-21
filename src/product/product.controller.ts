import { Request, Response } from "express";
import { responseError, responseSuccess } from "../helpers/response";

export async function getProductById(req: Request, res: Response) {
  try {
    // const dataId: string = req.params.id;

    // const result = await DiscountRepository.findSingle({ tenantId, dataId });

    const result = await Promise.resolve();

    return responseSuccess({ res, data: result });
  } catch (error) {
    return responseError({ res, error });
  }
}

export async function buyProduct(req: Request, res: Response) {
  try {
    // const dataId: string = req.params.id;

    // const result = await DiscountRepository.findSingle({ tenantId, dataId });

    const result = await Promise.resolve();

    return responseSuccess({ res, data: result });
  } catch (error) {
    return responseError({ res, error });
  }
}

export async function resetDeposit(req: Request, res: Response) {
  try {
    // const dataId: string = req.params.id;

    // const result = await DiscountRepository.findSingle({ tenantId, dataId });

    const result = await Promise.resolve();

    return responseSuccess({ res, data: result });
  } catch (error) {
    return responseError({ res, error });
  }
}

export async function getAllProduct(req: Request, res: Response) {
  try {
    // const dataId: string = req.params.id;

    // const result = await DiscountRepository.findSingle({ tenantId, dataId });

    const result = await Promise.resolve();

    return responseSuccess({ res, data: result });
  } catch (error) {
    return responseError({ res, error });
  }
}

export async function deleteProduct(req: Request, res: Response) {
  try {
    // const dataId: string = req.params.id;

    // const result = await DiscountRepository.findSingle({ tenantId, dataId });

    const result = await Promise.resolve();

    return responseSuccess({ res, data: result });
  } catch (error) {
    return responseError({ res, error });
  }
}
