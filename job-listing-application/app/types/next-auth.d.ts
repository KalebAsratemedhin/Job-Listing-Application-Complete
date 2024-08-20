import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user?: {
      accessToken?: string;
      access_token?: string;
      id_token?: string;
    } & DefaultSession["user"];
  }

  interface User {
    accessToken?: string;
    access_token?: string;
  }
  
}
