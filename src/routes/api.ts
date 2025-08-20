import { createGoalAPI, createNewTypeofGoal, deleteGoalAPI, getAllGoalAPI, getAllGoalByUserIdAPI, getAllTypeofGoal, getGoalByIdAPI, getTypeofGoalById, updateGoalAPI, uploadFileBackgroundAPI } from 'controllers/client/apiController/apiGoalController';
import { loginAPI, logoutAPI, getAccountAPI } from 'controllers/client/apiController/apiLoginController';
import { deleteUserAPI, getAllUserAPI, getUserByIdAPI, registerAPI, updateUserAPI } from 'controllers/client/apiController/apiUserController';
import express, { Express, Router } from 'express';
import { checkValidJWT } from 'src/middleware/jwt.middleware';
import { authorizeRole } from "src/middleware/authRole.middleware";
import { createTaskAPI, deleteTaskAPI, getTaskByIdOfGoal, updateStatusTask, updateTaskAPI, updateTaskColumn, updateTaskOrders } from 'controllers/client/apiController/apiTaskController';
import { createColumnForGoalId, deleteColumnAPI, getAllColumnAPI, updateColumnAPI } from 'controllers/client/apiController/apiColumnController';
import fileUploadMiddleware from 'src/middleware/multer';

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
    router.post('/goal', createGoalAPI);
    router.post('/goal/upload',
        fileUploadMiddleware('background'),
        createGoalAPI
    );

    // router.get('/goal', getAllGoalAPI);
    router.get('/goal', getAllGoalByUserIdAPI);
    router.get('/goal/:id', getGoalByIdAPI);
    router.put('/goal/:id', fileUploadMiddleware('background'), updateGoalAPI);
    router.delete('/goal/:id', deleteGoalAPI);

    // Type of Goal
    router.get('/type-of-goal', getAllTypeofGoal);
    router.get('/type-of-goal/:idGoal', getTypeofGoalById);
    router.post('/type-of-goal/:idGoal', createNewTypeofGoal);

    // Task
    // router.get('/task/:idGoal', getTaskByIdOfGoal);
    router.get('/goal/:idGoal/task', getTaskByIdOfGoal);
    router.put('/goal/:idGoal/task/:idTask/status', updateStatusTask);
    router.put('/goal/:idGoal/task/:idTask/move', updateTaskColumn);
    router.put('/goal/:idGoal/task/reorder', updateTaskOrders);
    router.post('/goal/:idGoal/task', createTaskAPI);
    router.put('/goal/:idGoal/task/:idTask', updateTaskAPI);
    router.delete('/goal/:idGoal/task/:idTask', deleteTaskAPI);

    // Column
    router.get('/goal/:idGoal/column', getAllColumnAPI);
    router.post('/goal/:idGoal/column', createColumnForGoalId);
    router.delete('/goal/:idGoal/column/:idColumn', deleteColumnAPI);
    router.put('/goal/:idGoal/column/:idColumn', updateColumnAPI);

    app.use('/api', checkValidJWT, router);
}

export default apiRoutes;