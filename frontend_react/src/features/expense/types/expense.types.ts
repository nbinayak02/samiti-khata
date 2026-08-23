import type { ID, Timestamp } from "@/types/model.types";
import type { CreateExpensePayload } from "../schemas/expense.schema";

export type Income = CreateExpensePayload & ID & Timestamp & {};
