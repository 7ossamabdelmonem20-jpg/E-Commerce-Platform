import * as z from "zod";

export const loginSchema = z.object({
  email: z.string().email().nonempty("this Field can't be empty "),
  password: z.string().min(6,"min length is 6 chars ").nonempty("this Field can't be empty "),
});