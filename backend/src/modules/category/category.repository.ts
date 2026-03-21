import { prisma } from "../../lib/prisma";
import { TCreateCategory } from "./category.types";

const CategoryRepository = {
  create: async (data: TCreateCategory, organizationId: number) => {
    return await prisma.category.create({
      data: {
        name: data.name,
        description: data.description || null,
        organizationId,
      },
    });
  },
  getByOrganization: async (organizationId: number) => {
    return await prisma.category.findMany({
      where: {
        organizationId,
      },
    });
  },
};
export default CategoryRepository;
