import { Router } from "express";
import { varifyUserHasRole, varifyUserLogin } from "../middleware/authorize";
import { UserRolesEnum } from "../user/user.types";
import { getProductById, deleteProduct, getAllProduct, createProduct, updateProduct } from "./product.controller";

const routes = Router();

routes
  .route("/")
  .get([varifyUserLogin, getAllProduct])
  .post([varifyUserHasRole(UserRolesEnum.seller), createProduct]);

routes
  .route("/:id")
  .get([varifyUserLogin, getProductById])
  .put([varifyUserHasRole(UserRolesEnum.seller), updateProduct])
  .delete([varifyUserHasRole(UserRolesEnum.seller), deleteProduct]);

export default routes;
