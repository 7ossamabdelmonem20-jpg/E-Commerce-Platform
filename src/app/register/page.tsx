"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import * as z from "zod";

import axios from "axios";

import { toast } from "sonner";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { formSchema } from "@/schema/register.schema";
import Link from "next/link";

export default function RegisterPage() {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),

    defaultValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const res = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/signup",
        values
      );

      if (res.data.message === "success") {
        toast.success("Account Created Successfully", {
          position: "top-center",
        });

        router.push("/login");
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        toast.error(err.response?.data?.message, {
          position: "top-center",
        });
      }
    }
  }

  return (
    
    <div className="min-h-screen bg-gradient-to-br from-green-800 via-green-950 to-emerald-950 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-xl rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 shadow-[0_0_40px_rgba(0,0,0,0.5)]">
        
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white">
            Create Account
          </h1>

          <p className="text-zinc-400 mt-3 text-sm">
            Join us and start your journey today
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-5"
        >
          {/* Name */}
          <div className="space-y-2">
            <label className="text-sm text-zinc-300">
              Full Name
            </label>

            <Controller
              name="name"
              control={form.control}
              render={({ field }) => (
                <Input
                  {...field}
                  placeholder="Enter your name"
                  className="h-12 rounded-xl border-zinc-700 bg-zinc-900/60 text-white placeholder:text-zinc-500 focus-visible:ring-emerald-500"
                />
              )}
            />

            {form.formState.errors.name && (
              <p className="text-sm text-red-500">
                {form.formState.errors.name.message}
              </p>
            )}
          </div>

          {/* Email */}
          <div className="space-y-2">
            <label className="text-sm text-zinc-300">
              Email Address
            </label>

            <Controller
              name="email"
              control={form.control}
              render={({ field }) => (
                <Input
                  type="email"
                  {...field}
                  placeholder="Enter your email"
                  className="h-12 rounded-xl border-zinc-700 bg-zinc-900/60 text-white placeholder:text-zinc-500 focus-visible:ring-emerald-500"
                />
              )}
            />

            {form.formState.errors.email && (
              <p className="text-sm text-red-500">
                {form.formState.errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div className="space-y-2">
            <label className="text-sm text-zinc-300">
              Password
            </label>

            <Controller
              name="password"
              control={form.control}
              render={({ field }) => (
                <Input
                  type="password"
                  {...field}
                  placeholder="Enter password"
                  className="h-12 rounded-xl border-zinc-700 bg-zinc-900/60 text-white placeholder:text-zinc-500 focus-visible:ring-emerald-500"
                />
              )}
            />

            {form.formState.errors.password && (
              <p className="text-sm text-red-500">
                {form.formState.errors.password.message}
              </p>
            )}
          </div>

          {/* Confirm Password */}
          <div className="space-y-2">
            <label className="text-sm text-zinc-300">
              Confirm Password
            </label>

            <Controller
              name="rePassword"
              control={form.control}
              render={({ field }) => (
                <Input
                  type="password"
                  {...field}
                  placeholder="Confirm password"
                  className="h-12 rounded-xl border-zinc-700 bg-zinc-900/60 text-white placeholder:text-zinc-500 focus-visible:ring-emerald-500"
                />
              )}
            />

            {form.formState.errors.rePassword && (
              <p className="text-sm text-red-500">
                {form.formState.errors.rePassword.message}
              </p>
            )}
          </div>

          {/* Phone */}
          <div className="space-y-2">
            <label className="text-sm text-zinc-300">
              Phone Number
            </label>

            <Controller
              name="phone"
              control={form.control}
              render={({ field }) => (
                <Input
                  type="tel"
                  {...field}
                  placeholder="Enter phone number"
                  className="h-12 rounded-xl border-zinc-700 bg-zinc-900/60 text-white placeholder:text-zinc-500 focus-visible:ring-emerald-500"
                />
              )}
            />

            {form.formState.errors.phone && (
              <p className="text-sm text-red-500">
                {form.formState.errors.phone.message}
              </p>
            )}
          </div>

          {/* Button */}
          <Button
            type="submit"
            className="w-full h-12 rounded-xl bg-emerald-700 text-white hover:bg-emerald-600 transition-all duration-300 text-base font-semibold"
          >
            Create Account
          </Button>
        </form>

        {/* Footer */}
        <p className="text-center text-sm text-black mt-6">
          Already have an account?
          <Link className="text-emerald-400 ml-1 cursor-pointer hover:underline" href="/login">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}








// "use client";

// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm, Controller } from "react-hook-form";
// import * as z from "zod";

// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { formSchema } from "@/schema/register.schema";
// import axios, { AxiosError } from "axios";
// import { toast } from "sonner"
// import { useRouter } from "next/navigation";


// export default function RegisterPage() {
//   let router = useRouter()
//   const form = useForm<z.infer<typeof formSchema>>({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       name: "",
//       email: "",
//       password: "",
//       rePassword: "",
//       phone: "",
//     },
//   });

//   async function onSubmit(values: z.infer<typeof formSchema>) {
//     // console.log(values);
//     try {
//       let res = await axios.post(
//         `https://ecommerce.routemisr.com/api/v1/auth/signup`,
//         values,
//       );
//       // console.log(res);
//       if (res.data.message === "success") {
//         toast.success("You Register Successfully",{position:"top-center",duration:3000})
//         router.push('/login')
//       }
//     } catch (err) {
//       if (axios.isAxiosError(err)) {
//         // console.log(err.response?.data?.message);
//         toast.error(err.response?.data?.message,{position:"top-center",duration:3000})
//       }
//     }
//   }

//   return (
//     <>
//       <h1>Register Now </h1>
//       <form
//         onSubmit={form.handleSubmit(onSubmit)}
//         className="space-y-4 max-w-md mx-auto mt-10"
//       >
//         <Controller
//           name="name"
//           control={form.control}
//           render={({ field }) => <Input placeholder="Name" {...field} />}
//         />
//         <Controller
//           name="email"
//           control={form.control}
//           render={({ field }) => <Input placeholder="Email" {...field} />}
//         />

//         <Controller
//           name="password"
//           control={form.control}
//           render={({ field }) => (
//             <Input type="password" placeholder="Password" {...field} />
//           )}
//         />
//         <Controller
//           name="rePassword"
//           control={form.control}
//           render={({ field }) => (
//             <Input type="password" placeholder="RePassword" {...field} />
//           )}
//         />
//         <Controller
//           name="phone"
//           control={form.control}
//           render={({ field }) => (
//             <Input type="text" placeholder="phone" {...field} />
//           )}
//         />
//         <Button type="submit">Register</Button>
//       </form>
//     </>
//   );
// }


