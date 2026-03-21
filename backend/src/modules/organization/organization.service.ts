import { NotFoundError } from "../../errors/customError";
import { organizationRepository } from "./organization.repository";
import { TCreateOrganization } from "./organization.types";

export const organizationService = {
  create: async (organizationData: TCreateOrganization, userId: number) => {
    return await organizationRepository.create(organizationData, userId);
  },

  getOrganizationsByUserId: async (userId: number) => {
    return await organizationRepository.findByUserId(userId);
  },

  getOrganizationById: async (id: number) => {
    return await organizationRepository.findById(id);
  },

  getOrganizationAssignedToUser: async (userId: number) => {
    const organization =
      await organizationRepository.findByAssignedUserId(userId);
    if (!organization) {
      throw new NotFoundError(
        "No organization assigned to the user with the provided ID.",
      );
    }
    return organization.organization;
  },
};
