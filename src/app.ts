import express from "express";
import helmet from "helmet";
import cors from "cors";
import compression from "compression";
import routes from "./routes";

const app = express();

app.use(compression());
app.use(cors());
app.use(helmet());
app.use(express.urlencoded({ extended: true, limit: "2mb" }));
app.use(express.json({ limit: "2mb" }));

app.get("/health", (req, res) => {
  res.json({ mesage: "Api working" });
});

app.use([routes]);

export default app;
