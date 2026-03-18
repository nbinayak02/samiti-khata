import { CommitteeRepository } from "./committee.repository";
import { TCommittee } from "./committee.types";

export const CommitteeService = {
  create: async (data: TCommittee, userId: number) => {
    return await CommitteeRepository.create(data, userId);
  },

  getById: async (id: number) => {
    return await CommitteeRepository.findById(id);
  },

  getAllByOrgId: async (organizationId: number) => {
    return await CommitteeRepository.findAllByOrg(organizationId);
  },

  getAll: async () => {
    return await CommitteeRepository.findAll();
  },
};
