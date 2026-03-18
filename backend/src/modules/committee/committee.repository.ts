import { Committee } from "../../../generated/prisma/client";
import { prisma } from "../../lib/prisma";
import { TCommittee } from "./committee.types";

export const CommitteeRepository = {
  create: async (data: TCommittee, userId: number): Promise<Committee> => {
    return await prisma.committee.create({
      data: {
        ...data,
        createdBy: userId,
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
      where: { organizationId },
    });
  },

  findAll: async (): Promise<Committee[]> => {
    return await prisma.committee.findMany();
  },
};
