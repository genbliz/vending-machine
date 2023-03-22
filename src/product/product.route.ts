import { Router } from "express";
import { varifyUserHasRole, varifyUserLogin } from "../middleware/authorize";
import { UserRolesEnum } from "../user/user.types";
import {
  getProductById,
  buyProduct,
  deleteProduct,
  getAllProduct,
  createProduct,
  updateProduct,
} from "./product.controller";

const routes = Router();

routes
  .route("/")
  .get([varifyUserLogin, getAllProduct])
  .post([varifyUserHasRole(UserRolesEnum.seller), createProduct])
  .put([varifyUserHasRole(UserRolesEnum.seller), updateProduct]);

routes.post("/buy", [varifyUserHasRole(UserRolesEnum.buyer), buyProduct]);

routes
  .route("/:id")
  .get([varifyUserLogin, getProductById])
  .delete([varifyUserHasRole(UserRolesEnum.seller), deleteProduct]);

export default routes;
