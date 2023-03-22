import { Router } from "express";
import { registerUser, getUsers, depositCoin, resetCoinDeposit, getUserById, deleteUserById } from "./user.controller";
import { varifyUserHasRole, varifyUserLogin } from "../middleware/authorize";
import { UserRolesEnum } from "./user.types";

const routes = Router();

routes.route("/").post([registerUser]).get([varifyUserLogin, getUsers]).delete([varifyUserLogin, deleteUserById]);
//
routes.post("/deposit", [varifyUserHasRole(UserRolesEnum.buyer), depositCoin]);
routes.post("/reset", [varifyUserHasRole(UserRolesEnum.buyer), resetCoinDeposit]);
//
routes.route("/:id").get([varifyUserLogin, getUserById]);

export default routes;
