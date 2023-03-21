import Joi from "joi";
import { UtilService } from "./util-service";

export function getJoiValidationErrors(err: Joi.ValidationError): string | null {
  if (err?.details?.length) {
    const details = UtilService.convertObjectToJsonPlainObject(err.details);
    const joiData = details.map((x) => x.message.replace(new RegExp('"', "g"), ""));
    return joiData.join("; ");
  }
  return null;
}

const joi_number_multiple_of_5 = (numberValue: unknown, helpers: Joi.CustomHelpers) => {
  console.log({ numberValue });

  const errorMsg = `'${helpers.original}' not valid. Must be multiple of 5`;

  const regEx = /^[0-9]*$/;

  if (!regEx.test(String(numberValue)) && isNaN(Number(numberValue))) {
    // Invalid format
    throw new Error(errorMsg);
  }

  const value = Number(numberValue);

  const isMultipleOf5 = value % 5 === 0;

  if (!isMultipleOf5) {
    throw new Error(errorMsg);
  }
  return value;
};

export function JoiMultipleOf5() {
  return Joi.number().empty("").custom(joi_number_multiple_of_5, "validation");
}
