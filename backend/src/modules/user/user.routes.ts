import { Router } from "express";
import { userController } from "./user.module";

const userRoutes = Router();

userRoutes.get("/current-user", userController.getCurrentUserController);

export default userRoutes;