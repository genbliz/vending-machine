import jwt from "jsonwebtoken";
import { envConfig } from "./env";
import { GenericFriendlyError } from "./error";

function jwtVerifyTokenBase(token: string) {
  return new Promise<{ error: string | null; decoded: any }>((resolve) => {
    jwt.verify(token, envConfig.JWT_SECRET, (err, decoded) => {
      if (err) {
        let errMsg = "Failed to authenticate token";
        if (err.name === "TokenExpiredError") {
          errMsg = "Your login has expired...";
        } else if (err.name === "JsonWebTokenError") {
          errMsg = "Failed to authenticate. Invalid Token";
        } else if (err.name === "NotBeforeError") {
          errMsg = "Failed to authenticate. Token not active";
        }
        resolve({ decoded: null, error: errMsg });
      } else {
        const decoded01 = typeof decoded === "string" ? JSON.parse(decoded) : decoded;
        resolve({ decoded: decoded01, error: null });
      }
    });
  });
}

export function signToken({ payload, audience }: { payload: Record<string, any>; audience: string }) {
  const token01 = jwt.sign(JSON.stringify(payload), envConfig.JWT_SECRET, {
    expiresIn: envConfig.JWT_EXPIRE_IN_SECONDS,
    audience,
  });
  return token01;
}

export async function verifyToken<T>(token: string) {
  const { decoded, error } = await jwtVerifyTokenBase(token);
  if (error) {
    throw GenericFriendlyError.createUnAuthorizedError(error);
  }
  return decoded as T;
}
