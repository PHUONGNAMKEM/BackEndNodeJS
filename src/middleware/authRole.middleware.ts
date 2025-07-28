import { Request, Response, NextFunction } from "express";

export const authorizeRole = (roles: string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const userRole = req.user?.role;

        if (!userRole || !roles.includes(userRole)) {
            return res.status(403).json({
                data: null,
                message: "Forbidden: You do not have permission"
            });
        }
        next();
    };
};
