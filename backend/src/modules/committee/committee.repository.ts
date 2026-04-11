import { prisma } from "../../lib/prisma";
import { TCommittee } from "./committee.types";
import { Committee } from "../../../generated/prisma/client";

export const CommitteeRepository = {
  create: async (
    data: TCommittee,
    userId: number,
    organizationId: number,
  ): Promise<Committee> => {
    return await prisma.committee.create({
      data: {
        ...data,
        createdBy: userId,
        organizationId: organizationId,
      },
    });
  },

  findById: async (id: number): Promise<Committee | null> => {
    return await prisma.committee.findUnique({
      where: { id },
    });
  },

  findAllByOrg: async (organizationId: number): Promise<Committee[]> => {
    return await prisma.committee.findMany({
      where: { organizationId, deletedAt: null },
    });
  },

  findAll: async (): Promise<Committee[]> => {
    return await prisma.committee.findMany();
  },

  delete: async (id: number) => {
    return await prisma.committee.update({
      where: {
        id,
      },
      data: {
        deletedAt: new Date().toISOString(),
      },
    });
  },
};
