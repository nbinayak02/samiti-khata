import { BadRequestError } from "../../errors/customError";
import UserRepository from "./user.repository";
import { TApproveAdminPayload } from "./user.type";

const UserService = {
  getAllAdmins: async () => {
    return await UserRepository.getAllAdmins();
  },

  getAllOperators: async (organizationId: number) => {
    if (isNaN(organizationId)) {
      throw new BadRequestError("Invalid organization ID");
    }
    return await UserRepository.getAllOperators(organizationId);
  },

  approveAdmin: async (data: TApproveAdminPayload) => {
    if (isNaN(data.userId) || isNaN(data.organizationId)) {
      throw new BadRequestError("Invalid user ID or organization ID");
    }
    return await UserRepository.approveAdmin(data);
  },
};

export default UserService;
