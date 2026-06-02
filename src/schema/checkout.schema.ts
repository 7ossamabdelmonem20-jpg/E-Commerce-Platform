import { z } from "zod";

export const checkoutSchema = z.object({
  details: z.string(),
  phone: z.string(),
  city: z.string(),
});

export type CheckoutFormValues = z.infer<typeof checkoutSchema>;