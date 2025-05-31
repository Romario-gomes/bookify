// src/app/api/auth/[...nextauth]/route.ts

import NextAuth, { AuthOptions } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { prisma } from "@/utils/prisma"
import * as bcrypt from "bcrypt";

export const authOptions: AuthOptions = {
  providers: [
     Credentials({
     credentials: {
      email: {},
      password: {}
     } ,
     authorize: async (credentials) => {
      console.log('Entrou');
      const user = await prisma.user.findUnique({
        where: {
          email: credentials?.email as string
        }
      });
      console.log('Usuário: ', user);
      await new Promise(resolve => setTimeout(resolve, 3000));
        
       if (user && await bcrypt.compare(credentials!.password, user.password)){ 
        return user;
       }else{

        console.log('Não passou');
        return null
       }
     }
    })
  ],
  
  pages: {
    signIn: '/sign-in',
  },
  secret: process.env.NEXTAUTH_SECRET,

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.companyId = (user as any).companyId;
      }
      return token;
    },

    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
        session.user.companyId = token.companyId as string;
      }
      return session;
    },
  }
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }