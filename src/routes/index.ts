import { Router } from "express";
import { varifyUserLogin } from "../middleware/authorize";
import product from "../product/product.route";
import { userController } from "../user/user.controller";
import user from "../user/user.route";

const routes = Router();

routes.use("/register", [userController.registerUser]);
routes.use("/login", [userController.loginUser]);
//
routes.use("/product", [varifyUserLogin, product]);
routes.use("/user", [varifyUserLogin, user]);

export default routes;
