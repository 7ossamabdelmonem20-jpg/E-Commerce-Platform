import * as z from "zod";

export const checkoutSchema = z.object({
    details: z
        .string()
        .min(3, "Details must be at least 3 characters"),

    phone: z
        .string()
        .min(11, "Phone number must be 11 numbers")
        .max(11, "Phone number must be 11 numbers").regex(/^01[0125][0-9]{8}$/),

    city: z
        .string()
        .min(2, "City name is too short"),

});