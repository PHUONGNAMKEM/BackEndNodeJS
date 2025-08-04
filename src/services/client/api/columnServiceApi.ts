import { prisma } from "config/client"

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

// const handleGetTasksByGoalId = async (idGoal: number) => {

//     const task = await prisma.task.findMany({
//         where: {
//             idGoal
//         }
//     });
//     return task;
// }

// const handleUpdateStatusTask = async (idGoal: number, idTask: number, statusPicked: boolean) => {

//     const task = await prisma.task.update({
//         where: {
//             idTask
//         },
//         data: {
//             isDone: statusPicked
//         },
//     });
//     await updateStatusProgressGoal(idGoal);

//     return task;
// }

// const handleCreateTask = async (title: string, isDone: boolean, dueDate: Date, idGoal: number) => {

//     const task = await prisma.task.create({
//         data: {
//             title,
//             isDone,
//             dueDate,
//             idGoal
//         },
//     });
//     await updateStatusProgressGoal(idGoal);
//     return task;
// }

export {
    handleGetAllColumn, handleCreateColumn
}