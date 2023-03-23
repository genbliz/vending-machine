import app from "./app";
import http from "http";
import { envConfig } from "./helpers/env";

const PORT = envConfig.PORT || 3000;
const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`App listening on PORT: ${PORT}`);
});
