import { SignupDto, TableMetadata } from "@/api/types";

export type User = Omit<SignupDto, "password"> & TableMetadata;
