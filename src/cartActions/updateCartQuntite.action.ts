
"use server"

import getMyToken from "@/utilities/getMyToken"

export default async function updateCartQuantity(id:string,count:string){
   let token = await getMyToken();
   if(!token) throw new Error ("please Login first");

   let res = await fetch(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,
    {
        method:"PUT",
        headers:{
            token,
            "Content-Type":"application/json"
        },
        body:JSON.stringify({count})
    }
   )

   let payload = res.json();
   return payload;
}