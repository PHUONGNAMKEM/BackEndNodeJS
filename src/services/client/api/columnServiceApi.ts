import { prisma } from "config/client"
import { handleGetTasksByGoalId } from "./taskServiceApi";

const handleGetAllColumn = async (idGoal: number) => {
    return await prisma.column.findMany({
        where: {
            idGoal
        }
    });
}

const handleCreateColumn = async (title: string, idGoal: number) => {
    const lastColumn = await prisma.column.findFirst({
        where: { idGoal },
        orderBy: { order: 'desc' },
    });

    const nextOrder = lastColumn?.order ? lastColumn.order + 1 : 1;

    const column = await prisma.column.create({
        data: {
            title,
            order: nextOrder,
            idGoal
        },
    });
    return column;
}

const handleDeleteColumn = async (idColumn: number) => {
    await prisma.task.deleteMany({
        where: { idColumn },
    });

    const columnDeleted = await prisma.column.delete({
        where: { idColumn },
    });

    return columnDeleted;
}

const handleUpdateColumn = async (idColumn: number, title: string) => {
    const columnUpdated = await prisma.column.update({
        where: {
            idColumn
        },
        data: {
            title
        }
    })

    return columnUpdated;
}

export {
    handleGetAllColumn, handleCreateColumn, handleDeleteColumn, handleUpdateColumn
}