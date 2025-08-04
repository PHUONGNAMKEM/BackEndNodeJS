import { Request, Response } from "express";
import { handleCreateColumn, handleGetAllColumn } from "services/client/api/columnServiceApi";

const getAllColumn = async (req: Request, res: Response) => {
    try {
        const { idGoal } = req.params;
        const columns = await handleGetAllColumn(+idGoal);
        res.status(200).json({
            data: columns,
            success: true,
            statusCode: 200
        })

    } catch (error) {
        res.status(500).json({
            message: "Cannot get all Column", error
        });
    }
}

const createColumnForGoalId = async (req: Request, res: Response) => {
    try {
        const { idGoal } = req.params;
        const { title } = req.body;
        const column = await handleCreateColumn(title, +idGoal);
        res.status(200).json({
            data: column,
            success: true,
            statusCode: 200
        })

    } catch (error) {
        res.status(500).json({
            message: "Cannot create a Column", error
        });
    }
}

// const getTaskByIdOfGoal = async (req: Request, res: Response) => {
//     try {
//         const { idGoal } = req.params;
//         const types = await handleGetTasksByGoalId(+idGoal);
//         res.status(200).json({
//             data: types,
//             success: true,
//             statusCode: 200
//         })

//     } catch (error) {
//         res.status(500).json({
//             message: "Cannot get this Task", error
//         });
//     }
// }

// const updateStatusTask = async (req: Request, res: Response) => {
//     try {
//         const { idGoal, idTask } = req.params;
//         const { isDone } = req.body;
//         const taskUpdated = await handleUpdateStatusTask(+idGoal, +idTask, isDone);
//         res.status(200).json({
//             data: taskUpdated,
//             success: true,
//             statusCode: 200
//         })
//     } catch (error) {
//         res.status(500).json({
//             message: "Cannot update this Task", error
//         });
//     }
// }

// const createTaskAPI = async (req: Request, res: Response) => {
//     try {
//         const { idGoal } = req.params;
//         const { title, isDone, dueDate, } = req.body;
//         const newTask = await handleCreateTask(title, isDone, new Date(dueDate), +idGoal);
//         res.status(200).json({
//             data: newTask,
//             success: true,
//             statusCode: 200
//         })
//     } catch (error) {
//         res.status(500).json({
//             message: "Cannot create a Task", error
//         });
//     }
// }

export {
    getAllColumn, createColumnForGoalId
}