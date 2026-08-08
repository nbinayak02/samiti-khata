import z from "zod";

export const committeeSchema = z.object({
  name: z
    .string("Name is required.")
    .trim()
    .min(2, "Name must be at least 2 chars long.")
    .max(50, "Committee name cannot exceed 50 characters."),

  description: z
    .string("Description is required.")
    .trim()
    .min(2, "Description must be at least 2 chars long.")
    .max(100, "Description cannot exceed 100 characters."),
});

export const subCommitteeSchema = z.object({
  name: z
    .string("Name is required.")
    .trim()
    .min(2, "Name must be at least 2 chars long.")
    .max(50, "Committee name cannot exceed 50 characters."),

  description: z.string().optional().default(""),
});

export type CommitteeSchema = z.infer<typeof committeeSchema>;
export type SubCommitteeSchema = z.infer<typeof subCommitteeSchema>;
