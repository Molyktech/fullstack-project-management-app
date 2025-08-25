import { memberService } from "../member/member.module";
import { WorkspaceController } from "./workspace.controller";
import { WorkspaceService } from "./workspace.service";

const workspaceService = new WorkspaceService();
// use the singleton instance from member.module
const workspaceController = new WorkspaceController(workspaceService, memberService);
export { workspaceController, workspaceService };