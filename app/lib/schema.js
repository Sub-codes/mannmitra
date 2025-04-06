import { z } from "zod";

export const accountSchema=z.object({
    name:z.string().min(1,"Name Is required"),
    type:z.enum(["CURRENT","SAVINGS"]),
    balance:z.string().min(1,"Intial Balance Is Required"),
    isDefault:z.boolean().default(false)
})