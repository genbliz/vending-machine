import { Router } from "express";
import { userController } from "./user.controller";

const routes = Router();

routes.route("/").get([userController.getUsers]).put([userController.deposit]);
//
routes.post("/deposit", [userController.deposit]);
routes.post("/reset", [userController.resetDeposit]);
//
routes.route("/:id").get([userController.getById]).delete([userController.deleteById]);

export default routes;
