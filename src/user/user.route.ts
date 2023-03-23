import { Router } from "express";
import {
  registerUser,
  getUsers,
  depositCoin,
  resetCoinDeposit,
  getUserById,
  deleteUserById,
  updateUser,
} from "./user.controller";
import { varifyUserHasRole, varifyUserLogin } from "../middleware/authorize";
import { UserRolesEnum } from "./user.types";

const routes = Router();

routes
  .route("/")
  .post([registerUser])
  .get([varifyUserLogin, getUsers])
  .put([varifyUserLogin, updateUser])
  .delete([varifyUserLogin, deleteUserById]);

routes.post("/deposit", [varifyUserHasRole(UserRolesEnum.buyer), depositCoin]);
routes.post("/reset", [varifyUserHasRole(UserRolesEnum.buyer), resetCoinDeposit]);
//
routes.route("/:id").get([varifyUserLogin, getUserById]);

export default routes;
