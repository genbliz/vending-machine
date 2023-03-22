import { GenericFriendlyError } from "./error";

export function getFriendlyErrorMessage({ error, message }: { error?: unknown; message?: any }) {
  let messageOrError: string = "";

  if (error instanceof GenericFriendlyError) {
    return error.message.trim();
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
  return messageOrError.trim();
}
