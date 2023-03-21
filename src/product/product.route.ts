import { Router } from "express";
import { getProductById, buyProduct, deleteProduct, getAllProduct } from "./product.controller";

const routes = Router();

routes.route("/").get([getAllProduct]).post([]).put([]);
routes.post("/buy", [buyProduct]);
routes.route("/:id").get([getProductById]).delete([deleteProduct]);

export default routes;
