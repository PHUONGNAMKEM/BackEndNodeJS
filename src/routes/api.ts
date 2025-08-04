import { createGoalAPI, deleteGoalAPI, getAllGoalAPI, getGoalByIdAPI, getTypeofGoal, updateGoalAPI } from 'controllers/client/apiController/apiGoalController';
import { loginAPI, logoutAPI, getAccountAPI } from 'controllers/client/apiController/apiLoginController';
import { deleteUserAPI, getAllUserAPI, getUserByIdAPI, registerAPI, updateUserAPI } from 'controllers/client/apiController/apiUserController';
import express, { Express, Router } from 'express';
import { checkValidJWT } from 'src/middleware/jwt.middleware';
import { authorizeRole } from "src/middleware/authRole.middleware";
import { createTaskAPI, getTaskByIdOfGoal, updateStatusTask } from 'controllers/client/apiController/apiTaskController';
import { createColumnForGoalId, getAllColumn } from 'controllers/client/apiController/apiColumnController';

const router = express.Router();

const apiRoutes = (app: Express) => {

    // Authentication
    // Login/Logout
    router.post('/login', loginAPI);
    router.post('/logout', logoutAPI);
    // Register (Create A New User)
    router.post('/user/register', registerAPI);
    // Get Account
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

    // Type of Goal
    router.get('/type-of-goal/:idGoal', getTypeofGoal);

    // Task
    // router.get('/task/:idGoal', getTaskByIdOfGoal);
    router.get('/goal/:idGoal/task', getTaskByIdOfGoal);
    router.put('/goal/:idGoal/task/:idTask', updateStatusTask);
    router.post('/goal/:idGoal/task', createTaskAPI);

    // Column
    router.get('/goal/:idGoal/column', getAllColumn);
    router.post('/goal/:idGoal/column', createColumnForGoalId);

    app.use('/api', checkValidJWT, router);
}

export default apiRoutes;