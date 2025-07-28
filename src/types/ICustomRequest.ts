import { Role } from "@prisma/client";

export interface CustomRequest extends Request {
  user?: {
    id: number;
    username?: string;
    email?: string;
    role?: Role;
  };
}