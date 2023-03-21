import bunyan from "bunyan";
import { envConfig } from "./env";

const streams: bunyan.Stream[] = [];
const name = `MVP-SERVER-${envConfig.NODE_ENV || ""}`.toUpperCase();

if (envConfig.NODE_ENV === "production") {
  streams.push({ stream: process.stdout, level: "info" });
} else {
  streams.push({ stream: process.stdout, level: "debug" });
}

export const LoggingService = bunyan.createLogger({
  name,
  streams,
  serializers: bunyan.stdSerializers,
});
