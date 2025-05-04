import NextAuth, { DefaultSession, DefaultUser } from "next-auth";
import { JWT } from "next-auth/jwt";


declare module "next-auth" {

  interface User extends DefaultUser {
    id: string;
    name: string;
    lastName: string;
    email: string;
    rolId?: {
      id?: string;
      nameRole?: string;
      descriptionRole?: string;
      isDeleted?: boolean;
    };
    accessToken?: string;
    refreshToken?: string;
    expiresIn?: number;
    mustBeChangepassword?: boolean;
  }
interface Account { }

interface Session {
  user: {
    id: string;
    name: string;
    lastName: string;
    email: string;
    rolId?: {
      id?: string;
      nameRole?: string;
      descriptionRole?: string;
      isDeleted?: boolean;
    };
    accessToken?: string;
    refreshToken?: string;
    expiresIn?: number;
    mustBeChangepassword?: boolean;
    
  } & DefaultSession["user"];
}
}


declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    name: string;
    lastName: string;
    email: string;
    rolId?: {
      id?: string;
      nameRole?: string;
      descriptionRole?: string;
      isDeleted?: boolean;
    };
    accessToken?: string;
    refreshToken?: string;
    expiresIn?: number;
    mustBeChangepassword?: boolean;
  }
}