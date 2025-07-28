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


export {
    handleGetAllGoalAPI, handleGetGoalById, handleUpdateGoal, handleDeleteGoal, handleCreateGoal
}