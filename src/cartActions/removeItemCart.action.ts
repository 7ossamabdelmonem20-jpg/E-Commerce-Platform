"use server"
import getMyToken from "@/utilities/getMyToken";

export default async function removeItemFromCart(id:string){

    let token =await getMyToken()
    if(!token) throw new Error ("Please login First");

    let res = await fetch(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,{
        method:"DELETE",
        headers:{
            token,
            "Context-Type":"application/json"
        }
    })

    let paylode = await res.json();
    return paylode

}