import z from "zod";
import billIssuerSchema from "./billIssuer.schema";

export type TCreateBillIssuer = {
    name: string;
    address?: string;
    phone?: string;
}
