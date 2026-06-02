"use client"

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";

import { toast } from "sonner";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { checkoutSchema } from "@/schema/checkout.schema";
import { useParams } from "next/navigation";
import onlinePayment from "@/CheckoutAction/onlineCheckout.action";

type CheckoutValues = z.infer<typeof checkoutSchema>;

export default function Checkout() {
  const router = useRouter();
const {id} :{id:string}= useParams()
// console.log(id);

  const form = useForm<CheckoutValues>({
    resolver: zodResolver(checkoutSchema),

    defaultValues: {
      details: "",
      phone: "",
      city: "",
    },
  });

  async function handleCheckout(values: CheckoutValues) {
    try {
      // console.log(values);
      let res =await onlinePayment(id,"http://localhost:3000/",values)
      console.log(res);
      if(res.status ==="success"){
        window.location.href = res.session.url
      }
      // هنا المفروض تبعت الداتا للـ API
      // مثال:
      /*
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message);
      }
      */

      toast.success("Order placed successfully ", {
        position: "top-center",

        className:
          "!bg-zinc-950/95 !border !border-emerald-500/20 !text-white !rounded-2xl !shadow-[0_0_30px_rgba(16,185,129,0.15)]",
      });

      router.push("/");
      router.refresh();

    } catch (error) {
      toast.error("Something went wrong", {
        position: "top-center",

        className:
          "!bg-zinc-950/95 !border !border-red-500/20 !text-white !rounded-2xl !shadow-[0_0_30px_rgba(239,68,68,0.15)]",
      });

      console.log(error);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-800 via-green-950 to-emerald-950 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-xl rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 shadow-[0_0_40px_rgba(0,0,0,0.5)]">

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white">
            Checkout Now
          </h1>

          <p className="text-zinc-400 mt-2">
            Complete your order details
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={form.handleSubmit(handleCheckout)}
          className="space-y-5"
        >

          {/* Details */}
          <div className="space-y-2">
            <label className="text-sm text-zinc-300">
              Details
            </label>

            <Controller
              name="details"
              control={form.control}
              render={({ field }) => (
                <Input
                  type="text"
                  {...field}
                  placeholder="Enter your details"
                  className="h-12 rounded-xl border-zinc-700 bg-zinc-900/60 text-white placeholder:text-zinc-500 focus-visible:ring-emerald-500"
                />
              )}
            />

            {form.formState.errors.details && (
              <p className="text-sm text-red-500">
                {form.formState.errors.details.message}
              </p>
            )}
          </div>

          {/* Phone */}
          <div className="space-y-2">
            <label className="text-sm text-zinc-300">
              Phone
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

          {/* City */}
          <div className="space-y-2">
            <label className="text-sm text-zinc-300">
              City
            </label>

            <Controller
              name="city"
              control={form.control}
              render={({ field }) => (
                <Input
                  type="text"
                  {...field}
                  placeholder="Enter your city"
                  className="h-12 rounded-xl border-zinc-700 bg-zinc-900/60 text-white placeholder:text-zinc-500 focus-visible:ring-emerald-500"
                />
              )}
            />

            {form.formState.errors.city && (
              <p className="text-sm text-red-500">
                {form.formState.errors.city.message}
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
              : "Checkout"}
          </Button>
        </form>
      </div>
    </div>
  )
}

