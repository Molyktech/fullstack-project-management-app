import { Router } from "express";
import { workspaceController } from "./workspace.module";


const workspaceRoutes = Router();

workspaceRoutes.post("/create/new", workspaceController.createWorkspaceController);
workspaceRoutes.put("/update/:id", workspaceController.updateWorkspaceByIdController);

workspaceRoutes.put(
    "/change/member/role/:id",
    workspaceController.changeWorkspaceMemberRoleController
);

workspaceRoutes.delete("/delete/:id", workspaceController.deleteWorkspaceByIdController);

workspaceRoutes.get("/all", workspaceController.getAllWorkspacesUserIsMemberController);

workspaceRoutes.get("/members/:id", workspaceController.getWorkspaceMembersController);
workspaceRoutes.get("/analytics/:id", workspaceController.getWorkspaceAnalyticsController);

workspaceRoutes.get("/:id", workspaceController.getWorkspaceByIdController);

export default workspaceRoutes;