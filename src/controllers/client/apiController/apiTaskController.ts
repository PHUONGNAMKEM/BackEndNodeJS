import { Request, Response } from "express";
import { handleGetTypeofGoal } from "services/client/api/goalServiceApi";
import { handleCreateTask, handleGetTasksByGoalId, handleUpdateStatusTask } from "services/client/api/taskServiceApi";

// const getAllTask = async (req: Request, res: Response) => {
//     try {
//         const tasks = await handleGetAllTask();
//         res.status(200).json({
//             data: tasks,
//             success: true,
//             statusCode: 200
//         })

//     } catch (error) {
//         res.status(500).json({
//             message: "Cannot get all Task", error
//         });
//     }
// }

const getTaskByIdOfGoal = async (req: Request, res: Response) => {
    try {
        const { idGoal } = req.params;
        const types = await handleGetTasksByGoalId(+idGoal);
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
        const { idGoal, idTask } = req.params;
        const { isDone } = req.body;
        const taskUpdated = await handleUpdateStatusTask(+idGoal, +idTask, isDone);
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

const createTaskAPI = async (req: Request, res: Response) => {
    try {
        const { idGoal } = req.params;
        const { title, isDone, dueDate, } = req.body;
        const newTask = await handleCreateTask(title, isDone, new Date(dueDate), +idGoal);
        res.status(200).json({
            data: newTask,
            success: true,
            statusCode: 200
        })
    } catch (error) {
        res.status(500).json({
            message: "Cannot create a Task", error
        });
    }
}

export {
    getTaskByIdOfGoal, updateStatusTask, createTaskAPI
}