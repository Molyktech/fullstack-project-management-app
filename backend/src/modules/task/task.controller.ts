import { Request, Response } from "express";
import { HTTPSTATUS } from "../../config/http.config";
import { asyncHandler } from "../../middlewares/asyncHandler.middleware";
import { roleGuard } from "../../utils/roleGuard";
import { projectIdSchema } from "../../validation/project.validation";
import { createTaskSchema, updateTaskSchema, taskIdSchema } from "../../validation/task.validation";
import { workspaceIdSchema } from "../../validation/workspace.validation";
import { TaskService } from "./task.service";
import { MemberService } from "../member/member.service";
import { Permissions } from "../../enums/role.enum";

export class TaskController {
    private taskService: TaskService;
    private memberService: MemberService;

    constructor(taskService: TaskService, memberService: MemberService) {
        this.taskService = taskService;
        this.memberService = memberService;

    }


    public createTaskController = asyncHandler(
        async (req: Request, res: Response) => {
            const userId = req.user?._id;

            const body = createTaskSchema.parse(req.body);
            const projectId = projectIdSchema.parse(req.params.projectId);
            const workspaceId = workspaceIdSchema.parse(req.params.workspaceId);

            const { role } = await this.memberService.getMemberRoleInWorkspace(userId, workspaceId);
            roleGuard(role, [Permissions.CREATE_TASK]);

            const { task } = await this.taskService.createTaskService(
                workspaceId,
                projectId,
                userId,
                body
            );

            return res.status(HTTPSTATUS.OK).json({
                message: "Task created successfully",
                task,
            });
        }
    );

    public updateTaskController = asyncHandler(
        async (req: Request, res: Response) => {
            const userId = req.user?._id;

            const body = updateTaskSchema.parse(req.body);

            const taskId = taskIdSchema.parse(req.params.id);
            const projectId = projectIdSchema.parse(req.params.projectId);
            const workspaceId = workspaceIdSchema.parse(req.params.workspaceId);

            const { role } = await this.memberService.getMemberRoleInWorkspace(userId, workspaceId);
            roleGuard(role, [Permissions.EDIT_TASK]);

            const { updatedTask } = await this.taskService.updateTaskService(
                workspaceId,
                projectId,
                taskId,
                body
            );

            return res.status(HTTPSTATUS.OK).json({
                message: "Task updated successfully",
                task: updatedTask,
            });
        }
    );

    public getAllTasksController = asyncHandler(
        async (req: Request, res: Response) => {
            const userId = req.user?._id;

            const workspaceId = workspaceIdSchema.parse(req.params.workspaceId);

            const filters = {
                projectId: req.query.projectId as string | undefined,
                status: req.query.status
                    ? (req.query.status as string)?.split(",")
                    : undefined,
                priority: req.query.priority
                    ? (req.query.priority as string)?.split(",")
                    : undefined,
                assignedTo: req.query.assignedTo
                    ? (req.query.assignedTo as string)?.split(",")
                    : undefined,
                keyword: req.query.keyword as string | undefined,
                dueDate: req.query.dueDate as string | undefined,
            };

            const pagination = {
                pageSize: parseInt(req.query.pageSize as string) || 10,
                pageNumber: parseInt(req.query.pageNumber as string) || 1,
            };

            const { role } = await this.memberService.getMemberRoleInWorkspace(userId, workspaceId);
            roleGuard(role, [Permissions.VIEW_ONLY]);

            const result = await this.taskService.getAllTasksService(workspaceId, filters, pagination);

            return res.status(HTTPSTATUS.OK).json({
                message: "All tasks fetched successfully",
                ...result,
            });
        }
    );

    public getTaskByIdController = asyncHandler(
        async (req: Request, res: Response) => {
            const userId = req.user?._id;

            const taskId = taskIdSchema.parse(req.params.id);
            const projectId = projectIdSchema.parse(req.params.projectId);
            const workspaceId = workspaceIdSchema.parse(req.params.workspaceId);

            const { role } = await this.memberService.getMemberRoleInWorkspace(userId, workspaceId);
            roleGuard(role, [Permissions.VIEW_ONLY]);

            const task = await this.taskService.getTaskByIdService(workspaceId, projectId, taskId);

            return res.status(HTTPSTATUS.OK).json({
                message: "Task fetched successfully",
                task,
            });
        }
    );

    public deleteTaskController = asyncHandler(
        async (req: Request, res: Response) => {
            const userId = req.user?._id;

            const taskId = taskIdSchema.parse(req.params.id);
            const workspaceId = workspaceIdSchema.parse(req.params.workspaceId);

            const { role } = await this.memberService.getMemberRoleInWorkspace(userId, workspaceId);
            roleGuard(role, [Permissions.DELETE_TASK]);

            await this.taskService.deleteTaskService(workspaceId, taskId);

            return res.status(HTTPSTATUS.OK).json({
                message: "Task deleted successfully",
            });
        }
    );
}