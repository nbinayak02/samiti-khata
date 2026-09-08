import { prisma } from "../../lib/prisma";

const HealthRepository = {
  getCheckDb: async () => {
    return await prisma.health.findMany({ take: 2 });
  },
};

export default HealthRepository;
