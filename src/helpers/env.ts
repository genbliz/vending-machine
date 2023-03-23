import dotenv from "dotenv";
import { expand } from "dotenv-expand";
const myEnv = dotenv.config();
expand(myEnv);
//
const envGlobCache: { [x: string]: string | undefined } = {};

/**
 * cache value, its faster!
 *
 * @param {string} envKey
 * @returns
 */
function getEnv(envKey: string) {
  if (envGlobCache[envKey] !== undefined) {
    return envGlobCache[envKey];
  }
  const envVal = process.env[envKey];
  if (envVal !== undefined) {
    envGlobCache[envKey] = envVal;
    return envVal;
  }
  return undefined;
}

function getEnvString(envKey: string) {
  const val = getEnv(envKey);
  if (val) {
    return val;
  }
  return "";
}

//@ts-ignore
function getEnvBool(envKey: string) {
  const val = getEnv(envKey);
  if (val !== undefined && String(val).trim() === "true") {
    return true;
  }
  return false;
}

function getEnvNumber(envKey: string, defaultVal?: number) {
  const val = getEnv(envKey);
  if (val !== undefined && !isNaN(Number(val))) {
    return Number(val);
  }
  return defaultVal as number;
}

type IEnvironment = "production" | "staging" | "development" | "test";

export const envConfig = {
  //
  PORT: getEnvNumber("PORT"),
  JWT_SECRET: getEnvString("JWT_SECRET"),
  JWT_EXPIRE_IN_SECONDS: getEnvNumber("JWT_EXPIRE_IN_SECONDS"),
  NODE_ENV: getEnvString("NODE_ENV") as IEnvironment,
  MONGO_DB_URI: getEnvString("MONGO_DB_URI"),
  // APP_AWS_ACCESS_KEY_ID: getEnvString("APP_AWS_ACCESS_KEY_ID"),
  // APP_AWS_SECRET_ACCESS_KEY: getEnvString("APP_AWS_SECRET_ACCESS_KEY"),
  // APP_AWS_REGION: getEnvString("APP_AWS_REGION"),
} as const;

export type IEnvConfig = typeof envConfig;
