import { Request, Response } from "express";
import { asyncHandler } from "../../middlewares/asyncHandler.middleware";
import { HTTPSTATUS } from "../../config/http.config";
import { UserService } from "./user.service";



export class UserController {
    private userService: UserService;

    constructor(userService: UserService) {
        this.userService = userService;
    }


    public getCurrentUserController = asyncHandler(
        async (req: Request, res: Response) => {
            const userId = req.user?._id;

            const { user } = await this.userService.getCurrentUserService(userId);

            return res.status(HTTPSTATUS.OK).json({
                message: "User fetch successfully",
                user,
            });
        }
    );
}