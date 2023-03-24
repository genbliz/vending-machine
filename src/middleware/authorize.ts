import express from "express";
import { StatusCode } from "../helpers/status-codes";
import { verifyGetUserSessionData } from "../helpers/auth-session";
import { responseError } from "../helpers/response";

export async function varifyUserLogin(req: express.Request, res: express.Response, next: express.NextFunction) {
  try {
    const userData = await verifyGetUserSessionData(req);
    if (userData?.userId) {
      return next();
    }

    return responseError({
      res,
      httpStatus: StatusCode.Unauthorized_401,
      message: "Token could NOT be verified...",
    });
  } catch (error) {
    return responseError({
      res,
      httpStatus: StatusCode.Unauthorized_401,
      error,
      message: "Error verifying token",
    });
  }
}

export function varifyUserHasRole(role: string) {
  return async function (req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
      const userData = await verifyGetUserSessionData(req);

      if (userData?.role && userData.role === role) {
        return next();
      }

      return responseError({
        res,
        httpStatus: StatusCode.Unauthorized_401,
        message: `Role mismatched. You do not have '${role}' role to perform this action`,
      });
    } catch (error) {
      return responseError({
        res,
        httpStatus: StatusCode.Unauthorized_401,
        error,
        message: "Error verifying role",
      });
    }
  };
}
