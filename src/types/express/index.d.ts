import { Role } from "@prisma/client";

declare namespace Express {
    export interface Request {
        user?: {
            id: number;
            username: string;
            email: string;
            role: Role;
        };
    }
}
