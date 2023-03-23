import app from "./app";
import http from "node:http";
import { envConfig } from "./helpers/env";

const PORT = envConfig.PORT || 3000;
const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`App listening on PORT: ${PORT}`);
});
