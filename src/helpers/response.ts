import { StatusCode } from "./status-codes";
import { Response } from "express";
import { LoggingService } from "./logging-service";
import { getFriendlyErrorMessage } from "./error-handler";

export function responseError({
  res,
  message,
  error,
  httpStatus = StatusCode.BadRequest_400,
}: {
  res: Response;
  message?: string;
  error?: string | Error | unknown;
  httpStatus?: StatusCode;
}) {
  const errorRes = {
    message,
    status: "error",
  };

  if (error) {
    LoggingService.error(error);
    const errorMsg = getFriendlyErrorMessage();
    if (errorMsg) {
      errorRes.message = errorMsg;
    }
  } else if (message) {
    LoggingService.error(message);
  }

  errorRes.message = errorRes.message || "Unknow error";

  return res.status(httpStatus).json(errorRes);
}

export function responseSuccess({
  res,
  data,
  message,
  httpStatus = StatusCode.OK_200,
}: {
  res: Response;
  data: any;
  message?: string | null;
  httpStatus?: StatusCode;
}) {
  const successRes = {
    message,
    data,
    code: httpStatus,
    status: "success",
  };
  return res.status(httpStatus).json(successRes);
}
