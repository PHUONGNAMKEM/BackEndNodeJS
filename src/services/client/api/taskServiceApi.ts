import { prisma } from "config/client"
import { updateStatusProgressGoal } from "./goalServiceApi";

// const handleGetAllTask = async () => {
//     return await prisma.task.findMany();
// }

const handleGetTasksByGoalId = async (idGoal: number) => {

    const task = await prisma.task.findMany({
        where: {
            idGoal
        }
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

const handleCreateTask = async (title: string, isDone: boolean, dueDate: Date, idGoal: number) => {

    const task = await prisma.task.create({
        data: {
            title,
            isDone,
            dueDate,
            idGoal
        },
    });
    await updateStatusProgressGoal(idGoal);
    return task;
}

export {
    handleGetTasksByGoalId, handleUpdateStatusTask, handleCreateTask
}