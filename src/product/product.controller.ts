import { Request, Response } from "express";
import { verifyGetUserSessionData } from "../helpers/auth-session-helper-service";
import { responseError, responseSuccess } from "../helpers/response";
import { VALID_DEPOSIT_BUY_VALUES } from "../user/user.types";
import { ProductRepository } from "./product.repository";
import { IProduct } from "./product.types";

export async function getProductById(req: Request, res: Response) {
  try {
    const dataId: string = req.params.id;
    const result = await ProductRepository.getById(dataId);

    return responseSuccess({ res, data: result });
  } catch (error) {
    return responseError({ res, error });
  }
}

export async function buyProduct(req: Request, res: Response) {
  try {
    const { amount, productId } = req.body as { amount: number; productId: string };

    if (VALID_DEPOSIT_BUY_VALUES.includes(amount)) {
      return responseError({ res, message: `Amount must be one of: ${VALID_DEPOSIT_BUY_VALUES.join(",")}` });
    }

    const result = await ProductRepository.findSingle({ tenantId, dataId });

    return responseSuccess({ res, data: result });
  } catch (error) {
    return responseError({ res, error });
  }
}

export async function getAllProduct(req: Request, res: Response) {
  try {
    const result = await ProductRepository.getAll();

    return responseSuccess({ res, data: result });
  } catch (error) {
    return responseError({ res, error });
  }
}

export async function createProduct(req: Request, res: Response) {
  try {
    const sessionUser = await verifyGetUserSessionData(req);

    const { amountAvailable, productName, cost } = req.body as IProduct;

    const result = await ProductRepository.create({
      cost,
      productName,
      amountAvailable,
      sellerId: sessionUser.userId,
    });

    return responseSuccess({
      res,
      data: result,
      message: `Product created successfully`,
    });
  } catch (error) {
    return responseError({ res, error });
  }
}

export async function updateProduct(req: Request, res: Response) {
  try {
    const sessionUser = await verifyGetUserSessionData(req);

    const result = await ProductRepository.getByIdForSeller({
      dataId: req.params.id,
      sellerId: sessionUser.userId,
    });

    if (!result?.id) {
      return responseError({ res, message: "Product not found" });
    }

    if (sessionUser.userId !== result.sellerId) {
      return responseError({ res, message: "Invalid action. You are not the owner" });
    }

    const { amountAvailable, productName, cost } = req.body as IProduct;

    const product01: IProduct = {
      ...result,
      cost,
      productName,
      amountAvailable,
    };

    const result01 = await ProductRepository.update(product01);

    return responseSuccess({
      res,
      data: result01,
      message: `Product created successfully`,
    });
  } catch (error) {
    return responseError({ res, error });
  }
}

export async function deleteProduct(req: Request, res: Response) {
  try {
    const sessionUser = await verifyGetUserSessionData(req);

    const dataId: string = req.params.id;

    const result = await ProductRepository.getByIdForSeller({
      dataId,
      sellerId: sessionUser.userId,
    });

    if (!result?.id) {
      return responseError({ res, message: "Product not found" });
    }

    if (sessionUser.userId !== result.sellerId) {
      return responseError({ res, message: "Invalid action. You are not the owner" });
    }

    await ProductRepository.deleteById(dataId);

    return responseSuccess({ res, data: {}, message: `Product deleted successfully` });
  } catch (error) {
    return responseError({ res, error });
  }
}
