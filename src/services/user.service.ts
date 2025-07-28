import { prisma } from "config/client";
import getConnection from "config/database";
import bcrypt from 'bcrypt';
const saltRounds = 10;

const handleCreateUser = async (name: string, email: string, password: string) => {

    const defaultPassword = await bcrypt.hash(password, saltRounds);

    const newUser = await prisma.user.create({
        data: {
            username: name,
            email: email,
            password: defaultPassword,
            point: 0,
            rank: 'bronze'
        }
    });
    return newUser;
}

const getAllUser = async () => {
    const users = await prisma.user.findMany();
    return users;
}

const handleDeleteUser = async (id: string) => {
    const userDeleted = await prisma.user.delete({
        where: {
            idUser: +id
        }
    });

    return userDeleted;
}

const getUserById = async (id: string) => {
    const user = await prisma.user.findUnique(
        {
            where: {
                idUser: +id
            }
        }
    );
    return user;
}

const updateUserById = async (id: string,
    name: string, email: string, address: string
) => {
    const updatedUser = await prisma.user.update({
        where: {
            idUser: +id,
        },
        data: {
            username: name,
            email: email,
        }
    });

    return updatedUser;
}

export { handleCreateUser, getAllUser, handleDeleteUser, getUserById, updateUserById }