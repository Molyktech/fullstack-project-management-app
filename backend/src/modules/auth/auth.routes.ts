import { Router } from "express";
import passport from "passport";
import { config } from "../../config/app.config";
import {authController} from "./auth.modules"

const failedUrl = `${config.FRONTEND_GOOGLE_CALLBACK_URL}?status=failure`;

const authRoutes = Router();

 authRoutes.post("/register", authController.registerUserController);
 authRoutes.post("/login", authController.loginController);

authRoutes.post("/logout", authController.logOutController);

authRoutes.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

authRoutes.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: failedUrl,
  }),
  authController.googleLoginCallback
);

export default authRoutes;