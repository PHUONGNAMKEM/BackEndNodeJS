import { prisma } from "config/client"
import { updateStatusProgressGoal } from "./goalServiceApi";

// const handleGetAllTask = async () => {
//     return await prisma.task.findMany();
// }

const handleGetTasksByGoalId = async (idGoal: number) => {

    const task = await prisma.task.findMany({
        where: {
            idGoal
        },
        orderBy: { priority: 'asc' }
    });
    return task;
}

const handleUpdateStatusTask = async (idGoal: number, idTask: number, statusPicked: boolean) => {

    const task = await prisma.task.update({
        where: {
            idTask
        },
        data: {
            isDone: statusPicked
        },
    });
    await updateStatusProgressGoal(idGoal);

    return task;
}

const handleCreateTask = async (title: string, dueDate: Date, idGoal: number, idColumn: number, isDone?: boolean, startDate?: Date,) => {
    const task = await prisma.task.create({
        data: {
            title,
            isDone: isDone ?? false,
            startDate: startDate ?? new Date(),
            dueDate,
            idColumn,
            idGoal
        },
    });
    await updateStatusProgressGoal(idGoal);
    return task;
}

const handleUpdateTaskColumn = async (idTask: number, newColumnId: number) => {
    const taskUpdated = await prisma.task.update({
        where: { idTask },
        data: { idColumn: newColumnId },
    });
    return taskUpdated;
}

const handleUpdateTaskOrders = async (tasks: { idTask: number; priority: number }[]) => {
    const taskUpdated = tasks.map((t) =>
        prisma.task.update({
            where: { idTask: t.idTask },
            data: { priority: t.priority },
        })
    );
    return Promise.all(taskUpdated); // waiting for all update finished
}

const handleUpdateTask = async (idTask: number,
    updateData: {
        title: string;
        startDate?: Date;
        dueDate: Date;
    }
) => {
    const taskUpdated = await prisma.task.update({
        where: { idTask },
        data: {
            title: updateData.title,
            startDate: new Date(updateData.startDate) ?? new Date(),
            dueDate: new Date(updateData.dueDate),
            updatedAt: new Date()
        }
    });

    return taskUpdated
}

const handleDeleteTask = async (idTask: number) => {
    const taskDeleted = await prisma.task.delete({
        where: { idTask }
    });

    return taskDeleted
}

export {
    handleGetTasksByGoalId, handleUpdateStatusTask, handleCreateTask,
    handleUpdateTaskColumn, handleUpdateTaskOrders, handleUpdateTask,
    handleDeleteTask
}