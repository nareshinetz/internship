import { DefaultSession } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: "student" | "admin" | "super_admin";
      phone?: string;
    } & DefaultSession["user"];
  }

  interface User {
    role?: "student" | "admin" | "super_admin";
    phone?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    role?: "student" | "admin" | "super_admin";
    phone?: string;
  }
}