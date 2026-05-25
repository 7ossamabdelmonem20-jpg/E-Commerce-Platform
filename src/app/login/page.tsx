"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import * as z from "zod";

import { signIn } from "next-auth/react";

import { toast } from "sonner";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { loginSchema } from "@/schema/login.schema";

export default function LoginPage() {
  const router = useRouter();

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),

    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof loginSchema>) {
    try {

      const res = await signIn("credentials", {
        email: values.email,
        password: values.password,
        redirect: false,
      });

      // لو فيه Error
      if (res?.error) {
        toast.error("Invalid Email Or Password", {
          position: "top-center",
        });

        return;
      }

      // نجاح
      if (res?.ok) {
        toast.success("Login Successfully", {
          position: "top-center",
        });

        router.push("/");
        router.refresh();
      }

    } catch {
      toast.error("Something went wrong", {
        position: "top-center",
      });
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-800 via-green-950 to-emerald-950 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-xl rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 shadow-[0_0_40px_rgba(0,0,0,0.5)]">

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white">
            Login
          </h1>

          <p className="text-zinc-400 mt-3 text-sm">
            Welcom to my web site
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-5"
        >

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

          {/* Button */}
          <Button
            disabled={form.formState.isSubmitting}
            type="submit"
            className="w-full h-12 rounded-xl bg-emerald-700 text-white hover:bg-emerald-600 transition-all duration-300 text-base font-semibold"
          >
            {form.formState.isSubmitting
              ? "Loading..."
              : "Login"}
          </Button>
        </form>

        {/* Footer */}
        <p className="text-center text-sm text-black mt-6">
          Create account?

          <Link
            className="text-emerald-400 ml-1 cursor-pointer hover:underline"
            href="/register"
          >
            Create
          </Link>
        </p>
      </div>
    </div>
  );
}