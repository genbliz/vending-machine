import app from "./app";
import http from "http";
import { envConfig } from "./helpers/env";
import { LoggingService } from "./helpers/logging-service";

const PORT = envConfig.PORT || 3000;
const server = http.createServer(app);

process.on("unhandledRejection", (reason, promise) => {
  LoggingService.error(reason);
});

if (envConfig.NODE_ENV !== "production") {
  process.on("warning", (warning) => {
    LoggingService.warn(warning);
  });
}

server.listen(PORT, () => {
  console.log(`App listening on PORT: ${PORT}`);
});
