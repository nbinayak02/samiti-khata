import { prisma } from "../../lib/prisma";

const UserRepository = {
  getAllAdmins: async () => {
    return await prisma.user.findMany({
      where: {
        role: "ADMIN",
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
      }
    });
  },
};

export default UserRepository;
