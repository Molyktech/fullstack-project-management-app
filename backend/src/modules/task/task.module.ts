import { memberService } from "../member/member.module";
import { TaskController } from "./task.controller";
import { TaskService } from "./task.service";

const taskService = new TaskService();
const taskController = new TaskController(taskService, memberService);

export { taskController };