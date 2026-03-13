import { prisma } from "../../lib/prisma";
import { UserSignUp } from "./user.type";

export const userRepository = {
  // create user
  create: async (userData: UserSignUp) => {
    return await prisma.user.create({
      data: userData,
    });
  },

  // find user
  findByEmail: async (email: string) => {
    return await prisma.user.findUnique({
      where: {
        email,
      },
    });
  },

  // get user role
  getUserRoleById: async (userId: number) => {
    return await prisma.userOrganization.findUnique({
      where: {
        userId,
      },
      select: {
        id: true,
        userId: true,
        organizationId: true,
        role: true,
      },
    });
  },

  // save refresh token
  saveRefreshToken: async (userId: number, refreshToken: string, expiresAt:Date) => {
    return await prisma.session.create({
      data: {
        userId,
        token: refreshToken,
        expiresAt,
      },
    });
  },
};
