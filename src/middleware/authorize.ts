import express from "express";
import { StatusCode } from "../helpers/status-codes";
import { verifyGetUserSessionData } from "../helpers/auth-session-helper-service";
import { responseError } from "../helpers/response";

export async function varifyUserLogin(req: express.Request, res: express.Response, next: express.NextFunction) {
  try {
    const userData = await verifyGetUserSessionData(req);
    if (userData?.id) {
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
