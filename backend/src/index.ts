import session from "cookie-session";
import cors from "cors";
import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";
import passport from "passport";
import { config } from "./config/app.config";
import connectDatabase from "./config/database.config";
import { HTTPSTATUS } from "./config/http.config";
import "./config/passport.config";
import { asyncHandler } from "./middlewares/asyncHandler.middleware";
import { errorHandler } from "./middlewares/errorHandler.middleware";

import isAuthenticated from "./middlewares/isAuthenticated.middleware";
import authRoutes from "./modules/auth/auth.routes";
import userRoutes from "./modules/user/user.routes";
import workspaceRoutes from "./modules/workspace/workspace.route";
import memberRoutes from "./modules/member/member.route";
import projectRoutes from "./modules/project/project.route";
import taskRoutes from "./modules/task/task.route";


const app = express();
const BASE_PATH = config.BASE_PATH;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: config.FRONTEND_ORIGIN,
    credentials: true
}));
app.use(session({
  name: "session",
  secret: config.SESSION_SECRET,
  maxAge: 24 * 60 * 60 * 1000, // 24 hours
  secure: config.NODE_ENV === "production",
  httpOnly: true,
  sameSite: "lax"
}));
app.use(passport.initialize());
app.use(passport.session());
app.get(
  "/",
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    res.status(HTTPSTATUS.OK).json({
      message: "Hello Subscribers!!!",
    });
  })
);


app.use(`${BASE_PATH}/auth`, authRoutes);
app.use(`${BASE_PATH}/user`, isAuthenticated, userRoutes);
app.use(`${BASE_PATH}/workspace`, isAuthenticated, workspaceRoutes);
app.use(`${BASE_PATH}/member`, isAuthenticated, memberRoutes);
app.use(`${BASE_PATH}/project`, isAuthenticated, projectRoutes);
app.use(`${BASE_PATH}/task`, isAuthenticated, taskRoutes);
app.use(errorHandler);


app.listen(config.PORT, async() => {
  console.log(`Server is running on ${config.PORT} in ${config.NODE_ENV} mode`);
    await connectDatabase();
});