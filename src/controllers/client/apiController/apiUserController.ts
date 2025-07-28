import { Request, Response } from "express";
import { handleDeleteUser, handleGetAllUserAPI, handleGetUserById, handleRegister, handleUpdateUser } from "services/client/api/userServiceApi";

const registerAPI = async (req: Request, res: Response) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({
                message: "Full name, email and password are required"
            });
        }

        const userCreated = await handleRegister(username, email, password);

        res.status(201).json({
            data: userCreated,
            message: "User created successfully",
            success: true,
            statusCode: 201
        })
    } catch (error) {
        return res.status(500).json({
            message: "(Register) Create User Failed",
            error: (error as Error).message
        });
    }
}

const getAllUserAPI = async (req: Request, res: Response) => {

    try {
        const users = await handleGetAllUserAPI();

        res.status(200).json({
            data: users,
            message: "Users fetched info successfully",
            success: true,
            statusCode: 200
        })
    } catch (error) {
        res.status(500).json({
            message: "Fetch users failed",
            error: (error as Error).message
        });
    }


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

const updateUserAPI = async (req: Request, res: Response) => {
    try {
        const { username, email } = req.body;
        const { id } = req.params;

        const userUpdated = await handleUpdateUser(+id, username, email);

        res.status(200).json({
            data: userUpdated,
            message: "User updated successfully",
            success: true,
            statusCode: 200
        })
    } catch (error) {
        return res.status(500).json({
            message: "Update User Failed",
            error: (error as Error).message
        });
    }
}

const deleteUserAPI = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const users = await handleDeleteUser(+id);
        res.status(200).json({
            data: users,
            message: "Users deleted successfully",
            success: true,
            statusCode: 200
        })
    } catch (error) {
        res.status(500).json({
            message: "Delete user failed",
            error: (error as Error).message
        });
    }
}

export {
    registerAPI, getAllUserAPI, getUserByIdAPI, updateUserAPI, deleteUserAPI
}