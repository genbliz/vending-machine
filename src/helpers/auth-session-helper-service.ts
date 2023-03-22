import { Request } from "express";
import { IAuthUserResult } from "../core/types";
import { GenericFriendlyError } from "./error";
import { jwtVerifyToken } from "./jwt";
import { LoggingService } from "./logging-service";

const SESSION_USER_VALUE_KEY = "current_session_user_00001";

async function getTokenFromHeaders(req: Request): Promise<string | null> {
  if (req.headers.authorization && typeof req.headers.authorization === "string") {
    const authorization01 = req.headers.authorization.trim();
    if (authorization01.startsWith("Bearer ")) {
      return authorization01.split("Bearer ")[1].trim();
    }
  }
  return Promise.resolve(null);
}

export async function verifyGetUserSessionData(req: Request) {
  const userCachedDataStr: string = req[SESSION_USER_VALUE_KEY];

  if (userCachedDataStr) {
    try {
      const userData: IAuthUserResult = JSON.parse(userCachedDataStr);
      if (userData?.userId) {
        return userData;
      }
    } catch (error) {
      LoggingService.error(error);
    }
  }

  const token = await getTokenFromHeaders(req);

  if (!token) {
    throw GenericFriendlyError.createUnAuthorizedError("Token not found");
  }

  const decodedUser = await jwtVerifyToken<IAuthUserResult>(token);

  if (!decodedUser?.userId) {
    throw GenericFriendlyError.createUnAuthorizedError("Token user not found");
  }

  req[SESSION_USER_VALUE_KEY] = JSON.stringify(decodedUser);
  return decodedUser;
}
