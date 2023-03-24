import { Router } from "express";
import product from "../product/product.route";
import { loginUser } from "../user/user.controller";
import user from "../user/user.route";

const routes = Router();

routes.post("/login", [loginUser]);
//
routes.use("/product", [product]);
routes.use("/user", [user]);

export default routes;
