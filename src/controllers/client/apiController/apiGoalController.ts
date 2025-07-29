import dayjs from "dayjs";
import { Request, Response } from "express";
import { handleCreateGoal, handleDeleteGoal, handleGetAllGoalAPI, handleGetGoalById, handleGetTypeofGoal, handleUpdateGoal } from "services/client/api/goalServiceApi";

const updateGoalAPI = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { title, description, endDate, isPublic } = req.body;

        if (!title || !description || !endDate) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        const goalUpdated = await handleUpdateGoal(+id, title, description, new Date(endDate), isPublic);
        // const io = req.app.get('io');
        // io.emit("goalUpdated");

        res.status(201).json({
            data: goalUpdated,
            message: "Goal updated successfully",
            success: true,
            statusCode: 201
        })
    } catch (error) {
        return res.status(500).json({
            message: "Update User Failed",
            error: (error as Error).message
        });
    }
}

const getAllGoalAPI = async (req: Request, res: Response) => {
    const goals = await handleGetAllGoalAPI();
    // const io = req.app.get('io');
    // io.emit("goalUpdated");
    res.status(200).json({
        data: goals,
        message: "Goal fetched info successfully",
        success: true,
        statusCode: 200
    })
}

const getGoalByIdAPI = async (req: Request, res: Response) => {
    const { id } = req.params;
    const goals = await handleGetGoalById(+id);

    // const io = req.app.get('io');
    // io.emit("goalUpdated");

    res.status(200).json({
        data: goals,
        message: "Goal fetched successfully",
        success: true,
        statusCode: 200
    })
}

// const updateUserAPI = async (req: Request, res: Response) => {
//     try {
//         const { username, email } = req.body;
//         const { id } = req.params;

//         const userUpdated = await handleUpdateUser(+id, username, email);

//         res.status(200).json({
//             data: userUpdated,
//             message: "User updated successfully",
//             success: true,
//             statusCode: 200
//         })
//     } catch (error) {
//         return res.status(500).json({
//             message: "Update User Failed",
//             error: (error as Error).message
//         });
//     }
// }

const deleteGoalAPI = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const goals = await handleDeleteGoal(+id);

        // const io = req.app.get('io');
        // io.emit("goalUpdated");  // truyền (phát) về cho client biết 

        res.status(200).json({
            data: goals,
            message: "Goal deleted successfully",
            success: true,
            statusCode: 200
        })
    } catch (error) {
        res.status(500).json({
            message: "Goal Deleted Failed", error
        });
    }
}

const createGoalAPI = async (req: Request, res: Response) => {
    try {
        let { title, description, startDate, endDate, isPublic } = req.body;
        const idUser = req.user!.id;

        if (!title || !description || !startDate || !endDate) {
            return res.status(400).json({
                message: "Title, description and date (start - end) are required"
            });
        }

        const now = dayjs().startOf('day');
        startDate = dayjs(startDate).startOf('day');
        endDate = dayjs(endDate).startOf('day');

        isPublic = isPublic === true || isPublic === 'true';

        if (startDate.isBefore(now)) {
            return res.status(400).json({
                message: "Start date must start from today"
            });
        }

        if (!startDate.isBefore(endDate)) {
            return res.status(400).json({
                message: "Start date must be before end date"
            });
        }

        const newGoal = await handleCreateGoal(+idUser, title, description, isPublic, startDate, endDate,);
        // const io = req.app.get('io');
        // io.emit("goalUpdated");

        res.status(201).json({
            data: newGoal,
            message: "Goal created successfully",
            success: true,
            statusCode: 201
        })
    } catch (error) {
        return res.status(500).json({
            message: "Create Goal Failed",
            error: (error as Error).message
        });
    }
}

const getTypeofGoal = async (req: Request, res: Response) => {
    try {
        const { idGoal } = req.params;
        const types = await handleGetTypeofGoal(+idGoal);
        res.status(200).json({
            data: types,
            success: true,
            statusCode: 200
        })

    } catch (error) {
        res.status(500).json({
            message: "Cannot get Type of this Goal", error
        });
    }
}

export {
    updateGoalAPI, getAllGoalAPI, getGoalByIdAPI, deleteGoalAPI, createGoalAPI,
    getTypeofGoal
}