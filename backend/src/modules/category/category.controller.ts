import { Response } from "express";
import { CustomRequest } from "../../types/customRequest";
import { BadRequestError } from "../../errors/customError";
import CategoryService from "./category.service";

const CategoryController = {
  handleCreateCategory: async (req: CustomRequest, res: Response) => {
    const organizationId = req.user?.organizationId;
    if (!organizationId) {
      throw new BadRequestError("Organization ID is required");
    }
    const category = await CategoryService.create(req.body, organizationId);
    res
      .status(201)
      .json({ message: "Category created successfully", data: category });
  },

  handleGetCategoriesByOrganization: async (
    req: CustomRequest,
    res: Response,
  ) => {
    const organizationId = req.user?.organizationId;
    if (!organizationId) {
      throw new BadRequestError("Organization ID is required");
    }
    const categories = await CategoryService.getByOrganization(organizationId);
    res
      .status(200)
      .json({ message: "Category fetched successfully", data: categories });
  },
};

export default CategoryController;
