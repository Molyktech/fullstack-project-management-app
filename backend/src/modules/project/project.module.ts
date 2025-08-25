import { ProjectService } from "./project.service";
import { ProjectController } from "./project.controller";
import { memberService } from "../member/member.module";

const projectService = new ProjectService();
const projectController = new ProjectController(projectService, memberService);


export { projectController, projectService };