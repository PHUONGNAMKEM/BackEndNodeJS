import { Request, Response } from "express";
import { handleGetTypeofGoal } from "services/client/api/goalServiceApi";
import { handleCreateTask, handleDeleteTask, handleGetTasksByGoalId, handleUpdateStatusTask, handleUpdateTask, handleUpdateTaskColumn, handleUpdateTaskOrders } from "services/client/api/taskServiceApi";

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
        const { title, isDone, startDate, dueDate, idColumn } = req.body;
        const newTask = await handleCreateTask(title, dueDate, +idGoal, idColumn, isDone, startDate);
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


const updateTaskColumn = async (req: Request, res: Response) => {
    try {
        const { idTask } = req.params;
        const { newColumnId } = req.body;
        const taskUpdated = await handleUpdateTaskColumn(+idTask, +newColumnId);
        res.status(200).json({
            data: taskUpdated,
            success: true,
            statusCode: 200
        })
    } catch (error) {
        res.status(500).json({
            message: "Cannot update this Task's position", error
        });
    }
}

const updateTaskOrders = async (req: Request, res: Response) => {
    try {
        const { tasks } = req.body;
        const taskUpdated = await handleUpdateTaskOrders(tasks);
        res.status(200).json({
            data: taskUpdated,
            success: true,
            statusCode: 200
        })
    } catch (error) {
        res.status(500).json({
            message: "Cannot update this Task's position", error
        });
    }
}

const updateTaskAPI = async (req: Request, res: Response) => {
    try {
        const { idTask } = req.params
        const { title, startDate, dueDate } = req.body;
        const taskUpdated = await handleUpdateTask(+idTask, {
            title,
            startDate,
            dueDate,
        });
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

const deleteTaskAPI = async (req: Request, res: Response) => {
    try {
        const { idTask } = req.params
        const taskDeleted = await handleDeleteTask(+idTask);
        res.status(200).json({
            data: taskDeleted,
            success: true,
            statusCode: 200
        })
    } catch (error) {
        res.status(500).json({
            message: "Cannot delete this Task", error
        });
    }
}

export {
    getTaskByIdOfGoal, updateStatusTask, createTaskAPI, updateTaskColumn, updateTaskOrders,
    updateTaskAPI, deleteTaskAPI
}