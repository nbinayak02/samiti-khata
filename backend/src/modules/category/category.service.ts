import CategoryRepository from "./category.repository";
import { TCreateCategory } from "./category.types";

const CategoryService = {
  create: async (data: TCreateCategory, organizationId: number) => {
    return await CategoryRepository.create(data, organizationId);
  },
  getByOrganization: async (organizationId: number) => {
    return await CategoryRepository.getByOrganization(organizationId);
  },
};

export default CategoryService;