import { prisma } from "config/client"

const handleGetTaskById = async (idGoal: number) => {

    const task = await prisma.task.findMany({
        where: {
            idGoal
        }
    });
    return task;
}

const handleUpdateStatusTask = async (idTask: number, statusPicked: boolean) => {

    const task = await prisma.task.update({
        where: {
            idTask
        },
        data: {
            isDone: statusPicked
        },
    });
    return task;
}

export {
    handleGetTaskById, handleUpdateStatusTask
}