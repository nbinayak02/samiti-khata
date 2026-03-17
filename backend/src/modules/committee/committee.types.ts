import z from "zod";
import committeeSchema from "./committee.schema";

export type TCommittee = z.infer<typeof committeeSchema>;