import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
      image?: string | null;
      companyId: string;  // <-- aqui você adiciona
    };
  }

  interface User {
    id: string;
    companyId: string; // <-- e aqui também
  }
}
