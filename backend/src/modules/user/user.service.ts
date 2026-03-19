import { BadRequestError } from "../../errors/customError";
import UserRepository from "./user.repository";

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
};

export default UserService;
