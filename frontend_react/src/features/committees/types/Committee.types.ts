import type { ID, Timestamp } from "@/types/model.types";
import type { CommitteeSchema } from "../schemas/committee.schema";

export type Committee = CommitteeSchema & ID & Timestamp & {
    isActive: boolean;
    organizationId: number;
    createdBy: number;
}
