import { GoalStatus } from "@prisma/client";
import { prisma } from "config/client"
import dayjs, { Dayjs } from "dayjs";

const handleUpdateGoal = async (idGoal: number, title: string, description: string, endDate: Date, isPublic: boolean) => {

    const updatedGoal = await prisma.goal.update({
        where: { idGoal },
        data: {
            title,
            description,
            endDate,
            isPublic
        }
    });
    return updatedGoal;
}

const handleGetAllGoalAPI = async () => {
    return await prisma.goal.findMany();
}

const handleGetAllGoalByUserIdAPI = async (idUser: number) => {
    return await prisma.goal.findMany({
        where: {
            idUser
        }
    });
}


const handleGetGoalById = async (id: number) => {
    return await prisma.goal.findUnique({
        where: { idGoal: id }
    }
    );
}

const handleDeleteGoal = async (id: number) => {

    const userUpdated = await prisma.goal.delete({
        where: { idGoal: id },
    });
    return userUpdated;
}

const handleCreateGoal = async (idUser: number, title: string, description: string, isPublic: boolean, startDate: Dayjs, endDate: Dayjs) => {
    const now = dayjs();
    const status: GoalStatus = startDate.isAfter(now) ? GoalStatus.pending : GoalStatus.active;

    const newGoal = await prisma.goal.create({
        data: {
            idUser: idUser,
            title: title,
            description: description,
            startDate: startDate.toDate(),
            endDate: endDate.toDate(),
            isPublic: isPublic,
            progress: 0,
            status: status
        }
    });
    return newGoal;
}

// Type of Goal
const handleGetTypeofGoal = async (idGoal: number) => {
    const types = await prisma.typeofGoal.findMany({
        where: {
            idGoal: +idGoal
        }
    });
    return types;
}

const handleUpdateTypeofGoal = async (idGoal: number, namety) => {
    const types = await prisma.typeofGoal.updateMany({
        where: {
            idGoal: +idGoal
        },
        data: {

        }
    });
    return types;
}

// Update Status and Progress corresponding
/**
 * Progress get 100 when all of this task isDone = true
 * All most situation Status is 'active', reset by 'completed' when Progress get 100
 */

const updateStatusProgressGoal = async (idGoal: number) => {
    const tasks = await prisma.task.findMany({
        where: {
            idGoal
        }
    });

    // get completed task / total task => progress
    const totalTasks = tasks.length;
    const completedTask = tasks.filter(t => t.isDone).length;

    const progress = totalTasks === 0 ? 0 : Math.round((completedTask / totalTasks) * 100);
    const status = progress === 100 ? 'completed' : 'active';

    await prisma.goal.update({
        where: { idGoal },
        data: {
            progress, status
        }
    })
}


export {
    handleGetAllGoalAPI, handleGetGoalById, handleUpdateGoal, handleDeleteGoal, handleCreateGoal,
    handleGetTypeofGoal, updateStatusProgressGoal, handleGetAllGoalByUserIdAPI
}