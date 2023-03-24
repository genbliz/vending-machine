import { Request, Response } from "express";
import { IAuthUserResult } from "../core/types";
import { verifyGetUserSessionData } from "../helpers/auth-session";
import { createHashedPassword, compareValidatePassword } from "../helpers/bcrypt-service";
import { GenericFriendlyError } from "../helpers/error";
import { jwtSignToken } from "../helpers/jwt";
import { responseError, responseSuccess } from "../helpers/response";
import { UserRepository } from "./user.repository";
import { IUser, VALID_DEPOSIT_BUY_COIN_VALUES } from "./user.types";

export async function getUserById(req: Request, res: Response) {
  try {
    const dataId: string = req.params.id;
    const result = await UserRepository.getById(dataId);

    const result01 = { ...result, password: undefined };

    return responseSuccess({ res, data: result01 });
  } catch (error) {
    return responseError({ res, error });
  }
}

export async function depositCoin(req: Request, res: Response) {
  try {
    const sessionUser = await verifyGetUserSessionData(req);

    const user = await UserRepository.getById(sessionUser.userId);

    if (!user?._id) {
      return responseError({ res, message: "User not found" });
    }

    const deposit: number = req.body.deposit;

    if (!VALID_DEPOSIT_BUY_COIN_VALUES.includes(deposit)) {
      return responseError({
        res,
        message: `Deposit coin must be one of: [${VALID_DEPOSIT_BUY_COIN_VALUES.join(", ")}]`,
      });
    }

    const deposit01 = (user.deposit || 0) + deposit;

    const result = await UserRepository.patch({
      dataId: sessionUser.userId,
      patialData: { deposit: deposit01 },
    });

    const result01 = { ...result, password: undefined };

    return responseSuccess({ res, data: result01 });
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

    const result01 = { ...result, password: undefined };

    return responseSuccess({ res, data: result01 });
  } catch (error) {
    return responseError({ res, error });
  }
}

export async function getUsers(req: Request, res: Response) {
  try {
    const result = await UserRepository.getAll({
      fields: ["deposit", "_id", "username", "role", "createdAt", "updatedAt"],
    });

    return responseSuccess({ res, data: result });
  } catch (error) {
    return responseError({ res, error });
  }
}

export async function updateUser(req: Request, res: Response) {
  try {
    const sessionUser = await verifyGetUserSessionData(req);

    const user = await UserRepository.getById(sessionUser.userId);

    if (!user?._id) {
      return responseError({ res, message: "User not found" });
    }

    const { password } = req.body as IUser;

    if (!password) {
      const result01 = { ...user, password: undefined };
      return responseSuccess({ res, data: result01 });
    }

    const passwordHashed = await createHashedPassword({ password });

    const result = await UserRepository.update({
      ...user,
      password: passwordHashed,
    });

    const result01 = { ...result, password: undefined };

    return responseSuccess({ res, data: result01 });
  } catch (error) {
    return responseError({ res, error });
  }
}

export async function registerUser(req: Request, res: Response) {
  try {
    const { role, username, password } = req.body as IUser;

    if (!(username && typeof username === "string")) {
      throw GenericFriendlyError.createValidationError("username is required and must be string");
    }

    if (!(password && typeof password === "string")) {
      throw GenericFriendlyError.createValidationError("password is required and must be string");
    }

    if (!(role && typeof role === "string")) {
      throw GenericFriendlyError.createValidationError("role is required and must be string");
    }

    const user = await UserRepository.getByUserName(username);

    if (user?.username) {
      throw GenericFriendlyError.createValidationError(`User with username '${username}', already exists`);
    }

    const passwordHashed = await createHashedPassword({ password });

    const result = await UserRepository.create({
      role,
      username,
      password: passwordHashed,
    });

    const result01 = { ...result, password: undefined };

    return responseSuccess({ res, data: result01 });
  } catch (error) {
    return responseError({ res, error });
  }
}

export async function loginUser(req: Request, res: Response) {
  try {
    const { username, password } = req.body;

    if (!(username && typeof username === "string")) {
      throw GenericFriendlyError.createValidationError("username is required and must be string");
    }

    if (!(password && typeof password === "string")) {
      throw GenericFriendlyError.createValidationError("password is required and must be string");
    }

    const user = await UserRepository.getByUserName(username);

    if (!user?.username) {
      throw GenericFriendlyError.createUnAuthorizedError("User not found");
    }

    const isMatched = await compareValidatePassword({
      passwordInput: password,
      passwordHashed: user.password,
    });

    if (!isMatched) {
      throw GenericFriendlyError.createUnAuthorizedError("Wrong password");
    }

    const payload: IAuthUserResult = {
      userId: user._id,
      role: user.role,
      username: user.username,
    };

    const access_token = jwtSignToken({ payload, audience: user._id });

    return responseSuccess({
      res,
      data: {
        access_token,
        user: {
          _id: user._id,
          username: user.username,
          role: user.role,
        },
      },
      message: "Login successfull!",
    });
  } catch (error) {
    return responseError({ res, error });
  }
}

export async function deleteUserById(req: Request, res: Response) {
  try {
    const sessionUser = await verifyGetUserSessionData(req);
    await UserRepository.deleteById(sessionUser.userId);

    return responseSuccess({ res, data: {}, message: `User deleted successfully` });
  } catch (error) {
    return responseError({ res, error });
  }
}
