import { Request, Response } from "express";
import { verifyGetUserSessionData } from "../helpers/auth-session-helper-service";
import { responseError, responseSuccess } from "../helpers/response";
import { StatusCode } from "../helpers/status-codes";
import { UserRepository } from "../user/user.repository";
import { VALID_DEPOSIT_BUY_COIN_VALUES } from "../user/user.types";
import { ProductRepository } from "./product.repository";
import { IProduct } from "./product.types";

export async function getProductById(req: Request, res: Response) {
  try {
    const dataId: string = req.params.id;
    const product = await ProductRepository.getById(dataId);

    return responseSuccess({ res, data: product });
  } catch (error) {
    return responseError({ res, error });
  }
}

export async function buyProduct(req: Request, res: Response) {
  try {
    const sessionUser = await verifyGetUserSessionData(req);

    const { amount, productId } = req.body as { amount: number; productId: string };

    if (!(typeof amount === "number")) {
      return responseError({
        res,
        message: "amount is required and must be a number",
        httpStatus: StatusCode.Validation_Error_422,
      });
    }

    if (!(productId && typeof productId === "string")) {
      return responseError({
        res,
        message: "productId is required",
        httpStatus: StatusCode.Validation_Error_422,
      });
    }

    if (!VALID_DEPOSIT_BUY_COIN_VALUES.includes(amount)) {
      return responseError({ res, message: `Amount must be one of: [${VALID_DEPOSIT_BUY_COIN_VALUES.join(", ")}]` });
    }

    const user = await UserRepository.getById(sessionUser.userId);

    if (!user?._id) {
      return responseError({ res, message: "User not found" });
    }

    const product = await ProductRepository.getById(productId);

    if (!product?._id) {
      return responseError({ res, message: "Product not found" });
    }

    if (amount > user.deposit) {
      return responseError({ res, message: `You have no sufficient deposit` });
    }

    if (amount > product.amountAvailable) {
      return responseError({ res, message: `Only ${product.amountAvailable} products, in stock` });
    }

    return responseSuccess({ res, data: product });
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

    const product = await ProductRepository.create({
      cost,
      productName,
      amountAvailable,
      sellerId: sessionUser.userId,
    });

    return responseSuccess({
      res,
      data: product,
      message: `Product created successfully`,
    });
  } catch (error) {
    return responseError({ res, error });
  }
}

export async function updateProduct(req: Request, res: Response) {
  try {
    const sessionUser = await verifyGetUserSessionData(req);

    console.log({
      dataId: req.params.id,
      sellerId: sessionUser.userId,
    });

    const product = await ProductRepository.getById(req.params.id);

    console.log({
      product,
    });

    if (!product?._id) {
      return responseError({ res, message: "Product not found" });
    }

    if (sessionUser.userId !== product.sellerId) {
      return responseError({
        res,
        message: "Invalid action. You are not the owner",
        httpStatus: StatusCode.Forbidden_403,
      });
    }

    const { amountAvailable, productName, cost } = req.body as IProduct;

    const product01: IProduct = {
      ...product,
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

    const product = await ProductRepository.getByIdForSeller({
      dataId,
      sellerId: sessionUser.userId,
    });

    if (!product?._id) {
      return responseError({ res, message: "Product not found" });
    }

    if (sessionUser.userId !== product.sellerId) {
      return responseError({ res, message: "Invalid action. You are not the owner" });
    }

    await ProductRepository.deleteById(dataId);

    return responseSuccess({ res, data: {}, message: `Product deleted successfully` });
  } catch (error) {
    return responseError({ res, error });
  }
}
