import { createGoalAPI, deleteGoalAPI, getAllGoalAPI, getGoalByIdAPI, updateGoalAPI } from 'controllers/client/apiController/apiGoalController';
import { loginAPI, logoutAPI, getAccountAPI } from 'controllers/client/apiController/apiLoginController';
import { deleteUserAPI, getAllUserAPI, getUserByIdAPI, registerAPI, updateUserAPI } from 'controllers/client/apiController/apiUserController';
import express, { Express, Router } from 'express';
import { checkValidJWT } from 'src/middleware/jwt.middleware';
import { authorizeRole } from "src/middleware/authRole.middleware";

const router = express.Router();

const apiRoutes = (app: Express) => {

    // Authentication
    // Login/Logout
    router.post('/login', loginAPI);
    router.post('/logout', logoutAPI);
    // Register (Create A New User)
    router.post('/user/register', registerAPI);
    // Get Accoutn
    router.get('/account', getAccountAPI);

    // User
    router.get('/user', getAllUserAPI);
    router.get('/user/:id', getUserByIdAPI);
    router.put('/user/:id', updateUserAPI);
    router.delete('/user/:id', authorizeRole(["ADMIN"]), deleteUserAPI);

    // Goal
    router.post('/goal', createGoalAPI)
    router.get('/goal', getAllGoalAPI);
    router.get('/goal/:id', getGoalByIdAPI);
    router.put('/goal/:id', updateGoalAPI);
    router.delete('/goal/:id', deleteGoalAPI);

    app.use('/api', checkValidJWT, router);
}

export default apiRoutes;