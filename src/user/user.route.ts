import { Router } from "express";
import { registerUser, getUsers, depositCoin, resetCoinDeposit, getUserById, deleteUserById } from "./user.controller";
import { varifyUserHasRole, varifyUserLogin } from "../middleware/authorize";
import { UserRolesEnum } from "./user.types";

const routes = Router();

routes.route("/").post([registerUser]).get([varifyUserLogin, getUsers]);
//
routes.post("/deposit", [varifyUserHasRole(UserRolesEnum.buyer), depositCoin]);
routes.post("/reset", [varifyUserLogin, resetCoinDeposit]);
//
routes.use([varifyUserLogin]).route("/:id").get([getUserById]).delete([deleteUserById]);

export default routes;
