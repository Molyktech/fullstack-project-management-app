import { Router } from "express";
import { taskController } from "./task.module";

const taskRoutes = Router();

taskRoutes.post(
    "/project/:projectId/workspace/:workspaceId/create",
    taskController.createTaskController
);

taskRoutes.delete("/:id/workspace/:workspaceId/delete", taskController.deleteTaskController);

taskRoutes.put(
    "/:id/project/:projectId/workspace/:workspaceId/update",
    taskController.updateTaskController
);

taskRoutes.get("/workspace/:workspaceId/all", taskController.getAllTasksController);

taskRoutes.get(
    "/:id/project/:projectId/workspace/:workspaceId",
    taskController.getTaskByIdController
);

export default taskRoutes;