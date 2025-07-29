import { Request, Response } from "express";
import { handleGetTypeofGoal } from "services/client/api/goalServiceApi";
import { handleGetTaskById, handleUpdateStatusTask } from "services/client/api/taskServiceApi";

const getTaskByIdOfGoal = async (req: Request, res: Response) => {
    try {
        const { idGoal } = req.params;
        const types = await handleGetTaskById(+idGoal);
        res.status(200).json({
            data: types,
            success: true,
            statusCode: 200
        })

    } catch (error) {
        res.status(500).json({
            message: "Cannot get this Task", error
        });
    }
}

const updateStatusTask = async (req: Request, res: Response) => {
    try {
        const { idTask } = req.params;
        const { isDone } = req.body;
        const taskUpdated = await handleUpdateStatusTask(+idTask, isDone);
        res.status(200).json({
            data: taskUpdated,
            success: true,
            statusCode: 200
        })
    } catch (error) {
        res.status(500).json({
            message: "Cannot update this Task", error
        });
    }
}

export {
    getTaskByIdOfGoal, updateStatusTask
}