import z from "zod";

const MAX_FILE_SIZE = 2000000; // 2 MB
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

export const imageSchema = z
  .instanceof(File, { message: "Please select a valid file." })
  .refine((file) => file?.size <= MAX_FILE_SIZE, "Maximum image size is 2MB.")
  .refine(
    (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
    "Only .jpeg, .jpg, .png and .webp images are supported.",
  );
