import { Router } from "express";
import { projectController } from "./project.module";

const projectRoutes = Router();

projectRoutes.post("/workspace/:workspaceId/create", projectController.createProjectController);

projectRoutes.put(
  "/:id/workspace/:workspaceId/update",
  projectController.updateProjectController
);

projectRoutes.delete(
  "/:id/workspace/:workspaceId/delete",
  projectController.deleteProjectController
);

projectRoutes.get(
  "/workspace/:workspaceId/all",
  projectController.getAllProjectsInWorkspaceController
);

projectRoutes.get(
  "/:id/workspace/:workspaceId/analytics",
  projectController.getProjectAnalyticsController
);

projectRoutes.get(
  "/:id/workspace/:workspaceId",
  projectController.getProjectByIdAndWorkspaceIdController
);

export default projectRoutes;