import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import 'dotenv/config';

declare module 'express' {
    interface Request {
        user?: {
            id: string | number;
            username: string;
            email: string;
            role: string;
        };
    }
}

const checkValidJWT = (req: Request, res: Response, next: NextFunction) => {
    const path = req.path;
    const whiteList = ["/login", "/logout"];
    const isWhiteList = whiteList.some(route => route === path);

    if (isWhiteList) {
        next();
        return;
    }

    const token = req.headers['authorization']?.split(' ')[1];
    // if (!token) {
    //     return res.status(401).json({
    //         data: null,
    //         message: "Missing token"
    //     });
    // }

    try {
        const dataDecoded: any = jwt.verify(token, process.env.JWT_SECRET!);
        req.user = {
            id: dataDecoded.id,
            username: dataDecoded.username,
            email: dataDecoded.email,
            role: dataDecoded.role,
        };
        next();
    } catch (error) {
        res.status(401).json({
            data: null,
            message: "Unauthorized. The token is invalid or expired."
        });
    }
};

export {
    checkValidJWT
};
