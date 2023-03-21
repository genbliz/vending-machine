import app from "./app";
import http from "node:http";

const PORT = 3000;
const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`App listening on PORT: ${PORT}`);
});
