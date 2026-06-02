"use server"

import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";


export default async function getMyToken() {

 try {
   let decodedToken = (await cookies()).get(`next-auth.session-token`)?.value || (await cookies()).get(`__Secure-next-auth.session-token`)?.value;
    if(!decodedToken) return null 
   let token =await decode({token:decodedToken,secret:process.env.NEXTAUTH_SECRET!})
    console.log(token);
    
  return token?.token
 } catch (error) {
  return null
 }
}