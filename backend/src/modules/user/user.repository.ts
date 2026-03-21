import { prisma } from "../../lib/prisma";
import { TApproveAdminPayload } from "./user.type";

const UserRepository = {
  getAllAdmins: async () => {
    return await prisma.user.findMany({
      where: {
        role: "ADMIN",
      },
      include: {
        userOrganizations: true,
      },
      omit: {
        password: true,
      },
    });
  },

  getAllOperators: async (organizationId: number) => {
    return await prisma.user.findMany({
      where: {
        role: "OPERATOR",
        organizations: {
          every: {
            id: organizationId,
          },
        },
      },
      omit: {
        password: true,
      },
    });
  },

  approveAdmin: async (data: TApproveAdminPayload) => {
    return await prisma.userOrganization.create({
      data: {
        userId: data.userId,
        organizationId: data.organizationId,
        status: "ACTIVE",
      },
    });
  },
};

export default UserRepository;
