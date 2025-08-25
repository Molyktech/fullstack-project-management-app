import UserModel from "../../models/user.model";
import { NotFoundException } from "../../utils/appError";

export class UserService {
    public async getCurrentUserService(userId: string) {
        const user = await UserModel.findById(userId).populate("currentWorkspace").select("-password");
        if (!user) {
            throw new NotFoundException("User not found");
        }
        return { user };
    }
}
