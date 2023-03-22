import { Request, Response } from "express";
import { IAuthUserResult } from "../core/types";
import { verifyGetUserSessionData } from "../helpers/auth-session-helper-service";
import { createHashedPassword, validatePassword } from "../helpers/bcrypt-service";
import { GenericFriendlyError } from "../helpers/error";
import { jwtSignToken } from "../helpers/jwt";
import { responseError, responseSuccess } from "../helpers/response";
import { UserRepository } from "./user.repository";
import { IUser, VALID_DEPOSIT_BUY_VALUES } from "./user.types";

export async function getUserById(req: Request, res: Response) {
  try {
    const dataId: string = req.params.id;
    const result = await UserRepository.getById(dataId);

    return responseSuccess({ res, data: result });
  } catch (error) {
    return responseError({ res, error });
  }
}

export async function depositCoin(req: Request, res: Response) {
  try {
    const sessionUser = await verifyGetUserSessionData(req);

    const user = await UserRepository.getById(sessionUser.userId);

    if (!user?.id) {
      return responseError({ res, message: "User not found" });
    }

    const deposit: number = req.body.deposit;

    if (VALID_DEPOSIT_BUY_VALUES.includes(deposit)) {
      return responseError({ res, message: `Deposit value must be one of: ${VALID_DEPOSIT_BUY_VALUES.join(",")}` });
    }

    const deposit01 = (user.deposit || 0) + deposit;

    const result = await UserRepository.patch({
      dataId: sessionUser.userId,
      patialData: { deposit: deposit01 },
    });

    return responseSuccess({ res, data: result });
  } catch (error) {
    return responseError({ res, error });
  }
}

export async function resetCoinDeposit(req: Request, res: Response) {
  try {
    const sessionUser = await verifyGetUserSessionData(req);

    const result = await UserRepository.patch({
      dataId: sessionUser.userId,
      patialData: { deposit: 0 },
    });

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
    const { role, username, password } = req.body as IUser;

    const passwordHashed = await createHashedPassword({ password });

    const result = await UserRepository.create({
      role,
      username,
      password: passwordHashed,
    });

    return responseSuccess({ res, data: result });
  } catch (error) {
    return responseError({ res, error });
  }
}

export async function loginUser(req: Request, res: Response) {
  try {
    const { username, password } = req.body;
    const user = await UserRepository.getByUserName(username);

    if (!user?.username) {
      throw GenericFriendlyError.createUnAuthorizedError("User not found");
    }

    const isMatched = await validatePassword({
      passwordInput: password,
      passwordHashed: user.password,
    });

    if (!isMatched) {
      throw GenericFriendlyError.createUnAuthorizedError("Wrong password");
    }

    const payload: IAuthUserResult = {
      userId: user.id,
      roles: user.role.split(","),
      username: user.username,
    };

    const access_token = jwtSignToken({ payload, audience: user.id });

    return responseSuccess({
      res,
      data: { access_token, user: { username: user.username } },
      message: "Login successfull!",
    });
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
