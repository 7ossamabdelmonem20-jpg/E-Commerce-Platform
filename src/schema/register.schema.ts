import z, { object } from "zod"
export const formSchema = z.object({

  name: z.string().min(3,"min length is 3").nonempty("this Field can't be empty "),
  email: z.string().email().nonempty("this Field can't be empty "),
  password: z.string().min(6,"min length is 6 chars ").nonempty("this Field can't be empty "),
  rePassword: z.string().min(6).min(6,"min length is 6 chars ").nonempty("this Field can't be empty "),
  phone: z.string().regex(/^01[0125][0-9]{8}$/),
}).refine((object)=>object.password === object.rePassword,{
    path:['rePassword'],
    error:"password and RePassword not Match"
})
