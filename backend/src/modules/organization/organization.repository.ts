import { Organization } from "../../../generated/prisma/client";
import { prisma } from "../../lib/prisma";
import { TCreateOrganization } from "./organization.types";

export const organizationRepository = {
  create: async (
    organizationData: TCreateOrganization,
    userId: number,
  ): Promise<Organization> => {
    return await prisma.organization.create({
      data: { ...organizationData, createdBy: userId },
    });
  },

  findById: async (id: number): Promise<Organization | null> => {
    return await prisma.organization.findUnique({
      where: { id },
    });
  },

  findByUserId: async (userId: number): Promise<Organization[]> => {
    return await prisma.organization.findMany({
      where: { createdBy: userId },
    });
  },
};
