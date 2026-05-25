import getMyToken from "@/utilities/getMyToken"


export default async function getLoggedUserCart(){

    let token = await getMyToken()
    if(!token){
        throw new Error ("Please login ")
    }

   let res = await fetch(`https://ecommerce.routemisr.com/api/v1/cart`,
    {
        method:"GET",
        headers:{
            token,
            "Context-Type":"application/json"
        }
    }
   )
   let payload = res.json();
   return payload
}