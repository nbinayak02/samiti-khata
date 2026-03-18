import { Request, Response } from "express";
import { CustomRequest } from "../../types/customRequest";
import { organizationService } from "./organization.service";
import { BadRequestError, NotFoundError } from "../../errors/customError";

export const organizationController = {
  handleCreateOrganization: async (req: CustomRequest, res: Response) => {
    const userId = req.user?.id;

    if (!userId) {
      throw new BadRequestError(
        "User ID is required to create an organization.",
      );
    }

    const organization = await organizationService.create(req.body, userId);

    res.status(201).json({
      message: "Organization created successfully",
      data: organization,
    });
  },

  handleGetOrganizationsByUser: async (req: CustomRequest, res: Response) => {
    const userId = req.user?.id;

    if (!userId) {
      throw new BadRequestError("Provide the user ID to fetch organizations.");
    }

    const organizations =
      await organizationService.getOrganizationsByUserId(userId);

    res
      .status(200)
      .json({
        message: "Organization fetched successfully!",
        data: organizations,
      });
  },

  handleGetOrganizationById: async (
    req: Request<{ id: string }>,
    res: Response,
  ) => {
    const id = parseInt(req.params.id, 10);

    if (isNaN(id)) {
      throw new BadRequestError("Organization ID must be a valid number.");
    }

    const organization = await organizationService.getOrganizationById(id);

    if (!organization) {
      throw new NotFoundError("Organization not found with the provided ID.");
    }

    res.status(200).json(organization);
  },
};
