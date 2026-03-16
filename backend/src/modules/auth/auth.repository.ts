import { Prisma, User } from "../../../generated/prisma/client";
import { prisma } from "../../lib/prisma";
import { UserSignUp } from "./auth.types";

export const userRepository = {
  // create user
  create: async (userData: UserSignUp): Promise<User> => {
    return await prisma.user.create({
      data: userData,
    });
  },

  // find user
  findByEmail: async (email: string): Promise<User | null> => {
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
  getUserOrganizatioRelationByUserId: async (userId: number) => {
    return await prisma.userOrganization.findUnique({
      where: {
        userId,
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

  findRecentActiveSessionByUserId: async (userId: number) => {
    const sessions = await prisma.session.findMany({
      where: {
        userId,
        refreshedAt: null, // only consider active sessions
      },
    });

    return sessions[sessions.length - 1]; // return the most recent active session
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

  deleteSessionByUserId: async (userId: number) => {
    return await prisma.session.deleteMany({
      where: {
        userId,
      },
    });
  },

  deleteExpiredSessionsByUserId: async (userId: number) => {
    return await prisma.session.deleteMany({
      where: {
        userId,
        expiresAt: {
          lt: new Date(),
        },
      },
    });
  },
};
