import z from "zod";
import CategorySchema from "./category.schema";

export type TCreateCategory = z.infer<typeof CategorySchema>;
