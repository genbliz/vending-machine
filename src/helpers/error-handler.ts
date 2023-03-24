import { GenericFriendlyError } from "./error";

export function getFriendlyErrorMessage({ error, message }: { error?: unknown; message?: any }) {
  let messageOrError: string = "";

  if (error instanceof GenericFriendlyError) {
    return {
      message: error.message.trim(),
      httpStatus: error.httpStatus,
    };
  }

  // let _errorMsg: unknown;
  // if (errorMsg instanceof Error) {
  //   _errorMsg = errorMsg.message;
  // } else {
  //   _errorMsg = errorMsg;
  // }

  if (messageOrError === "" && message && typeof message === "string") {
    messageOrError = message;
  }
  return { message: messageOrError.trim() };
}
