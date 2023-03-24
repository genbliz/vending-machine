import { Router } from "express";
import { varifyUserHasRole } from "../middleware/authorize";
import { buyProduct } from "../product/product.controller";
import product from "../product/product.route";
import { depositCoin, loginUser } from "../user/user.controller";
import user from "../user/user.route";
import { UserRolesEnum } from "../user/user.types";

const routes = Router();

routes.post("/login", [loginUser]);
routes.post("/buy", [varifyUserHasRole(UserRolesEnum.buyer), buyProduct]);
routes.post("/deposit", [varifyUserHasRole(UserRolesEnum.buyer), depositCoin]);

routes.use("/product", [product]);
routes.use("/user", [user]);

export default routes;
