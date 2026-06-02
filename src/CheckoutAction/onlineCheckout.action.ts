"use server";

import getMyToken from "@/utilities/getMyToken";
import type { CheckoutFormValues } from "@/schema/checkout.schema";

export default async function onlinePayment(
  cartId: string,
  url: string,
  formValues: CheckoutFormValues
) {
  let token = await getMyToken();

  if (!token) throw new Error("Login First");

  let res = await fetch(
    `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${url}`,
    {
      method: "POST",
      headers: {
        token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ shippingAddress: formValues }),
    }
  );

  return res.json();
}