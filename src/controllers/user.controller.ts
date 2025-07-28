import { Request, Response } from "express";
import { getAllUser, getUserById, handleCreateUser, handleDeleteUser, updateUserById } from "services/user.service";


const getHomePage = async (req: Request, res: Response) => {
    // get users
    const users = await getAllUser();
    return res.render('home', {
        users: users
    });
}

const getCreateUserPage = (req: Request, res: Response) => {
    return res.render('create-user');
}

const postCreateUser = async (req: Request, res: Response) => {
    const { name, email, address } = req.body;

    const a = await handleCreateUser(name, email, address);
    return res.redirect('/');
}

const postDeleteUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    const a = await handleDeleteUser(id);
    return res.redirect('/');
}

const getViewUser = async (req: Request, res: Response) => {
    const { id } = req.params;

    const user = await getUserById(id);
    return res.render('view-user', {
        id: id,
        user: user
    })
}

const postUpdateUser = async (req: Request, res: Response) => {
    const { id, name, email, address } = req.body;

    const a = await updateUserById(id, name, email, address);
    return res.redirect('/');
}

export { getHomePage, getCreateUserPage, postCreateUser, postDeleteUser, getViewUser, postUpdateUser };