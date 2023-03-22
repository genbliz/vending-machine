import { Router } from "express";
import { registerUser, getUsers, depositCoin, resetCoinDeposit, getUserById, deleteUserById } from "./user.controller";
import { varifyUserLogin } from "../middleware/authorize";

const routes = Router();

routes.route("/").post([registerUser]).get([varifyUserLogin, getUsers]);
//
routes.post("/deposit", [varifyUserLogin, depositCoin]);
routes.post("/reset", [varifyUserLogin, resetCoinDeposit]);
//
routes.use([varifyUserLogin]).route("/:id").get([getUserById]).delete([deleteUserById]);

export default routes;
