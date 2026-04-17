import { BadRequestError } from "../../errors/customError";
import { CommitteeRepository } from "./committee.repository";
import { TCommittee } from "./committee.types";

export const CommitteeService = {
  create: async (data: TCommittee, userId: number, organizationId: number) => {
    return await CommitteeRepository.create(data, userId, organizationId);
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

  delete: async (id: number) => {
    if (isNaN(id)) {
      throw new BadRequestError("Invalid ID provided.");
    }
    return await CommitteeRepository.delete(id);
  },
};
