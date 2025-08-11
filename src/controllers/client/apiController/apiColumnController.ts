import { Request, Response } from "express";
import { handleCreateColumn, handleDeleteColumn, handleGetAllColumn, handleUpdateColumn } from "services/client/api/columnServiceApi";

const getAllColumnAPI = async (req: Request, res: Response) => {
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
        res.status(201).json({
            data: column,
            success: true,
            statusCode: 201
        })

    } catch (error) {
        res.status(500).json({
            message: "Cannot create a Column", error
        });
    }
}

const deleteColumnAPI = async (req: Request, res: Response) => {
    try {
        const { idColumn } = req.params;
        const columnDeleted = await handleDeleteColumn(+idColumn);
        res.status(200).json({
            data: columnDeleted,
            success: true,
            statusCode: 200
        })
    } catch (error) {
        res.status(500).json({
            message: "Cannot delete this Column", error
        });
    }
}

const updateColumnAPI = async (req: Request, res: Response) => {
    try {
        const { idColumn } = req.params;
        const { title } = req.body;
        const columnUpdated = await handleUpdateColumn(+idColumn, title);
        res.status(200).json({
            data: columnUpdated,
            success: true,
            statusCode: 200
        })
    } catch (error) {
        res.status(500).json({
            message: "Cannot update this Column", error
        });
    }
}


export {
    getAllColumnAPI, createColumnForGoalId, deleteColumnAPI, updateColumnAPI
}