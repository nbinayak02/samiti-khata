import { Prisma } from "../../../generated/prisma/client";
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

  findById: async (id: number) => {
    return await prisma.user.findUnique({
      where: {
        id,
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

  findSessionByToken: async (refreshToken: string) => {
    return await prisma.session.findUnique({
      where: {
        token: refreshToken,
      },
    });
  },

  // save refresh token
  saveRefreshToken: async (
    userId: number,
    refreshToken: string,
    expiresAt: Date,
    prismaClient: Prisma.TransactionClient = prisma,
  ) => {
    return await prismaClient.session.create({
      data: {
        userId,
        token: refreshToken,
        expiresAt,
      },
    });
  },

  setSessionRefreshed: async (
    sessionId: number,
    transaction: Prisma.TransactionClient,
  ) => {
    return await transaction.session.update({
      where: {
        id: sessionId,
        refreshedAt: null, // only update if the session is not already refreshed - prevent race conditions
      },
      data: {
        refreshedAt: new Date(),
      },
    });
  },

  markSessionRefreshedAndSaveNewToken: async function (
    sessionId: number,
    userId: number,
    refreshToken: string,
    expiryDuration: Date,
  ) {
    let thisObject = this;
    return await prisma.$transaction(async (tx: Prisma.TransactionClient) => {
      // set the session as refreshed
      await thisObject.setSessionRefreshed(sessionId, tx);
      // save new refresh token in database
      await thisObject.saveRefreshToken(
        userId,
        refreshToken,
        expiryDuration,
        tx,
      );
    });
  },
};
