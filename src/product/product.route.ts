import { Router } from "express";
import { varifyUserLogin } from "../middleware/authorize";
import {
  getProductById,
  buyProduct,
  deleteProduct,
  getAllProduct,
  createProduct,
  updateProduct,
} from "./product.controller";

const routes = Router();

routes.route("/").get([varifyUserLogin, getAllProduct]).post([createProduct]).put([updateProduct]);
routes.post("/buy", [buyProduct]);
routes.route("/:id").get([varifyUserLogin, getProductById]).delete([deleteProduct]);

export default routes;
