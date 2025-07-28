import { Request, Response } from "express";
import { handleUserLogin } from "services/client/api/loginServiceApi";

const loginAPI = async (req: Request, res: Response) => {
    const { username, password } = req.body;

    try {
        const { access_token, user } = await handleUserLogin(username, password);
        res.status(201).json({
            statusCode: 201,
            message: "",
            data: {
                access_token,
                user
            }
        })
    } catch (error) {
        res.status(401).json({
            statusCode: 401,
            data: null,
            message: error.message
        })
    }
}

const logoutAPI = async (req: Request, res: Response) => {
    return res.status(200).json({
        statusCode: 200,
        message: "Logout successful",
        data: null
    });
}

const getAccountAPI = async (req: Request, res: Response) => {
    try {
        if (!req.user) {
            return res.status(401).json({
                data: null,
                message: "Unauthorized, user not existed"
            });
        }

        return res.status(200).json({
            data: {
                user: req.user
            },
            message: "Get account successfully"
        });
    } catch (err) {
        return res.status(500).json({
            data: null,
            message: "Server error"
        });
    }
}

export {
    loginAPI, logoutAPI, getAccountAPI
}