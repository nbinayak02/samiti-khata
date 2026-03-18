import { Request, Response } from "express";
import { CommitteeService } from "./committee.services";
import { CustomRequest } from "../../types/customRequest";
import { TResponsePayload } from "../../types/responseType";
import { BadRequestError, NotFoundError } from "../../errors/customError";

const CommitteeController = {
  handleCreate: async (req: CustomRequest, res: Response) => {
    const userId = req.user?.id;

    if (!userId) {
      throw new BadRequestError("User ID is required");
    }

    const committee = await CommitteeService.create(req.body, userId);

    const responsePayload: TResponsePayload = {
      message: "Committee created successfully",
      data: committee,
      error: null,
    };

    res.status(201).json(responsePayload);
  },

  handleGetById: async (req: Request<{ id: string }>, res: Response) => {
    const id = parseInt(req.params.id, 10);

    if (isNaN(id)) {
      throw new BadRequestError("Invalid committee ID");
    }

    const committee = await CommitteeService.getById(id);

    if (!committee) {
      throw new NotFoundError("Committee not found");
    }

    const responsePayload: TResponsePayload = {
      message: "Committee retrieved successfully",
      data: committee,
      error: null,
    };

    res.status(200).json(responsePayload);
  },

  handleGetAll: async (req: Request, res: Response) => {
    const committees = await CommitteeService.getAll();
    res.status(200).json({
      message: "Committees retrieved successfully",
      data: committees,
      error: null,
    });
  },

  handleGetAllByOrgId: async (
    req: Request<{ orgId: string }>,
    res: Response,
  ) => {
    const organizationId = parseInt(req.params.orgId, 10);
    if (isNaN(organizationId)) {
      throw new BadRequestError("Invalid organization ID");
    }

    const committees = await CommitteeService.getAllByOrgId(organizationId);

    const responsePayload: TResponsePayload = {
      message: "Committees retrieved successfully",
      data: committees,
      error: null,
    };

    res.status(200).json(responsePayload);
  },
};

export default CommitteeController;
