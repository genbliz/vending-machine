import { Request, Response } from "express";
import { responseError, responseSuccess } from "../helpers/response";
import { UserRepository } from "./user.repository";

export async function getUserById(req: Request, res: Response) {
  try {
    // const dataId: string = req.params.id;

    // const result = await DiscountRepository.findSingle({ tenantId, dataId });

    const result = await Promise.resolve();

    return responseSuccess({ res, data: result });
  } catch (error) {
    return responseError({ res, error });
  }
}

export async function depositCoin(req: Request, res: Response) {
  try {
    const dataId: string = req.params.id;
    const deposit: number = req.body.deposit;

    const result = await UserRepository.patch({ dataId, patialData: { deposit } });

    return responseSuccess({ res, data: result });
  } catch (error) {
    return responseError({ res, error });
  }
}

export async function resetCoinDeposit(req: Request, res: Response) {
  try {
    const dataId: string = req.params.id;

    const result = await UserRepository.patch({ dataId, patialData: { deposit: 0 } });

    return responseSuccess({ res, data: result });
  } catch (error) {
    return responseError({ res, error });
  }
}

export async function loginUser(req: Request, res: Response) {
  try {
    const { username, password } = req.body;

    const result = await UserRepository.getByUserName(username);

    if (result?.username === username) {
      //
    }

    return responseSuccess({ res, data: result });
  } catch (error) {
    return responseError({ res, error });
  }
}

export async function getUsers(req: Request, res: Response) {
  try {
    const result = await UserRepository.getAll();

    return responseSuccess({ res, data: result });
  } catch (error) {
    return responseError({ res, error });
  }
}

export async function registerUser(req: Request, res: Response) {
  try {
    const { username, password, role } = req.body;

    const result = await UserRepository.create({
      username,
      password,
      role,
    });

    return responseSuccess({ res, data: result });
  } catch (error) {
    return responseError({ res, error });
  }
}

export async function deleteUserById(req: Request, res: Response) {
  try {
    const dataId: string = req.params.id;

    const result = await UserRepository.deleteById(dataId);

    return responseSuccess({ res, data: result });
  } catch (error) {
    return responseError({ res, error });
  }
}
