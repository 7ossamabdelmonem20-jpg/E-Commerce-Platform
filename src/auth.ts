// import { NextAuthOptions } from "next-auth"
// import Credentials from "next-auth/providers/credentials"
// import { jwtDecode } from "jwt-decode";

// export const authOptions: NextAuthOptions = {
//     providers: [
//         Credentials({
//             name: "Credentials",
//             //data elly haخodha men user
//             credentials: {
//                 email: {},
//                 password: {}
//             },

//             authorize: async (credentials) => {
//                 let res = await fetch(`${process.env.API}/auth/signin`, {
//                     method: "POST",
//                     body: JSON.stringify({
//                         email: credentials?.email,
//                         password: credentials?.password
//                     }),
//                     headers: { "Content-type": "application/json" }

//                 })
//                 let payload = await res.json();
//                 if (payload.message !== "success") {
//                     return null;
//                 }
//                 // console.log(payload);
//                 const decoded: { id: string } = jwtDecode(payload.token);
//                 // console.log(decoded);

//                 if (payload.message === 'success') {
//                     return {
//                         id: decoded.id,
//                         name: payload.user.name,
//                         email: payload.user.email,
//                         user: payload.user,
//                         token: payload.token,
//                     };

//                 } else {
//                     throw new Error("wrong credentials")
//                 }


//             }
//         })
//     ],
//     session: {
//         strategy: "jwt",
//     },
//     secret: process.env.NEXTAUTH_SECRET,

//     callbacks: {
//         async jwt({ token, user }) {

//             //token access at server
//             if (user) {
//                 token.user = user?.user;
//                 token.token = user.token;
//             }
//             //encrypted 
//             return token // token ==> object {user:user,token:token}
//         },
//         //access clinet 
//         async session({ session, token }) {
//             session.user = token.user
//             return session
//         }
//     }
// }

import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { jwtDecode } from "jwt-decode";

export const authOptions: NextAuthOptions = {
  providers: [
    Credentials({
      name: "Credentials",

      credentials: {
        email: {},
        password: {},
      },

      authorize: async (credentials) => {

        const res = await fetch(
          `${process.env.API}/auth/signin`,
          {
            method: "POST",

            body: JSON.stringify({
              email: credentials?.email,
              password: credentials?.password,
            }),

            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const payload = await res.json();

        if (payload.message !== "success") {
          return null;
        }

        const decoded: { id: string } = jwtDecode(
          payload.token
        );

        return {
          id: decoded.id,
          name: payload.user.name,
          email: payload.user.email,
          user: payload.user,
          token: payload.token,
        };
      },
    }),
  ],

  session: {
    strategy: "jwt",
  },

  secret: process.env.NEXTAUTH_SECRET,

  callbacks: {
    async jwt({ token, user }) {

      if (user) {
        token.user = user.user;
        token.token = user.token;
      }

      return token;
    },

    async session({ session, token }) {

      session.user = token.user as any;

      return session;
    },
  },
};