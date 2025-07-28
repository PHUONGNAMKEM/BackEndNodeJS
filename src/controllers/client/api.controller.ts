import { handleGetAllUser, handleGetUserById } from "services/client/api.service"
import { Request, Response } from "express";
import { hashPassword } from "src/utils/hash";
import { prisma } from "config/client";
import { handleRegister } from "services/client/api/userServiceApi";


const getAllUserAPI = async (req: Request, res: Response) => {

    const users = await handleGetAllUser();

    res.status(200).json({
        data: users,
        message: "Users fetched successfully",
        success: true,
        statusCode: 200
    })
}

const getUserByIdAPI = async (req: Request, res: Response) => {
    const { id } = req.params;
    const users = await handleGetUserById(+id);

    res.status(200).json({
        data: users,
        message: "Users fetched successfully",
        success: true,
        statusCode: 200
    })
}

// const createUserAPI = async (req: Request, res: Response) => {
//     const { username, email, password } = req.body;

//     if (!username || !email || !password) {
//         return res.status(400).json({
//             message: "Full name, email and password are required"
//         });
//     }

//     const userCreated = await handleRegister(username, email, password);

//     res.status(200).json({
//         data: userCreated,
//         message: "Users fetched successfully",
//         success: true,
//         statusCode: 200
//     })
// }

export {
    getAllUserAPI, getUserByIdAPI,
}