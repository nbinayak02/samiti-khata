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
};
