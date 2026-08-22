import type { ID, Timestamp } from "@/types/model.types";
import type { CreateIncomePayload } from "../schemas/income.schema";

export type Income = CreateIncomePayload & ID & Timestamp;
