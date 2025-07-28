import { prisma } from "config/client"
import bcrypt from 'bcrypt';

const saltRounds = 10;

const handleRegister = async (username: string, email: string, password: string) => {
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = await prisma.user.create({
        data: {
            username: username,
            email: email,
            password: hashedPassword,
            point: 0,
            rank: 'bronze'
        }
    });
    return newUser;
}

const handleGetAllUserAPI = async () => {
    return await prisma.user.findMany();
}

const handleGetUserById = async (id: number) => {
    return await prisma.user.findUnique({
        where: { idUser: id }
    }
    );
}

const handleUpdateUser = async (id: number, username: string, email: string) => {

    const userUpdated = await prisma.user.update({
        where: { idUser: id },
        data: {
            username: username,
            email: email,
        }
    });
    return userUpdated;
}

const handleDeleteUser = async (id: number) => {

    const userUpdated = await prisma.user.delete({
        where: { idUser: id },
    });
    return userUpdated;
}

export {
    handleGetAllUserAPI, handleGetUserById, handleRegister, handleUpdateUser, handleDeleteUser
}