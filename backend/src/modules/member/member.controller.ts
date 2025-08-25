import { Request, Response } from "express";
import z from "zod";
import { HTTPSTATUS } from "../../config/http.config";
import { asyncHandler } from "../../middlewares/asyncHandler.middleware";
import { MemberService } from "./member.service";

export class MemberController {
    private memberService: MemberService;

    constructor(memberService: MemberService) {
        this.memberService = memberService;
    }

    public joinWorkspaceController = asyncHandler(
  async (req: Request, res: Response) => {
    const inviteCode = z.string().parse(req.params.inviteCode);
    const userId = req.user?._id;
    
    const { workspaceId, role } = await this.memberService.joinWorkspaceByInviteService(
      userId,
      inviteCode
    );

    return res.status(HTTPSTATUS.OK).json({
      message: "Successfully joined the workspace",
      workspaceId,
      role,
    });
  }
);
}