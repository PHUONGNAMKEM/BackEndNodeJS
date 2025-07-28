import { prisma } from "config/client";
import { comparePassword } from "src/utils/hash";
import jwt from 'jsonwebtoken';
import 'dotenv/config';

const handleUserLogin = async (username: string, password: string) => {
    const user = await prisma.user.findFirst({
        where: { username },
    });

    if (!user) {
        throw new Error(`Username: ${username} not found`);
    }

    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
        throw new Error(`Invalid password`);
    }

    // had user login (login info) -> define access token
    const payload = {
        id: user.idUser,
        username: user.username,
        email: user.email,
        role: user.role
    }
    const secret = process.env.JWT_SECRET;
    const expiresIn: any = process.env.JWT_EXPIRES_IN
    const access_token = jwt.sign(payload, secret, {
        expiresIn: expiresIn
    })

    // Remove password before return for user
    const { password: _, ...userWithoutPassword } = user;

    return {
        access_token,
        user: userWithoutPassword
    };
}

const handleLogout = async (username: string, password: string) => {

}

export {
    handleUserLogin, handleLogout
}
