import dayjs, { Dayjs } from "dayjs";
import { Request, Response } from "express";
import { handleAddTypeofGoalToGoalType, handleCreateGoal, handleCreateTypeofGoal, handleDeleteAllTypeofGoal, handleDeleteGoal, handleDeleteTypeofGoalOnGoalType, handleGetAllGoalAPI, handleGetAllGoalByUserIdAPI, handleGetAllTypeofGoal, handleGetGoalById, handleGetTypeofGoal, handleUpdateGoal, handleUpdateTypeofGoal } from "services/client/api/goalServiceApi";
import jwt from "jsonwebtoken";
import { deadlineValidation } from "config/deadlineValidation";
import { Prisma } from "@prisma/client";


const updateGoalAPI = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        let { title, description, endDate, isPublic } = req.body;
        const file = req.file;
        const backgroundFileUpload = file?.filename ?? "background_default.jpg";

        if (!title || !description || !endDate) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        isPublic = isPublic === true || isPublic === 'true';

        const goalUpdated = await handleUpdateGoal(+id, title, description, new Date(endDate), isPublic, backgroundFileUpload);
        // const io = req.app.get('io');
        // io.emit("goalUpdated");

        res.status(201).json({
            data: goalUpdated,
            message: "Goal updated successfully",
            success: true,
            statusCode: 201
        })
    } catch (error) {
        return res.status(500).json({
            message: "Update User Failed",
            error: (error as Error).message
        });
    }
}

const getAllGoalAPI = async (req: Request, res: Response) => {
    const goals = await handleGetAllGoalAPI();
    // const io = req.app.get('io');
    // io.emit("goalUpdated");
    res.status(200).json({
        data: goals,
        message: "Goal fetched info successfully",
        success: true,
        statusCode: 200
    })
}

const getAllGoalByUserIdAPI = async (req: Request, res: Response) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ message: "No token provided" });
        }

        const token = authHeader.split(" ")[1];
        // Giải mã token
        const decoded: any = jwt.verify(token, process.env.JWT_SECRET as string);

        // Lấy idUser từ payload JWT
        const idUser = decoded.id;

        const goals = await handleGetAllGoalByUserIdAPI(+idUser);

        res.status(200).json({
            data: goals,
            message: "Goal fetched info successfully",
            success: true,
            statusCode: 200
        })
    } catch (error) {
        return res.status(401).json({ message: "Invalid or expired token", error: error.message });
    }
}

const getGoalByIdAPI = async (req: Request, res: Response) => {
    const { id } = req.params;
    const goals = await handleGetGoalById(+id);

    // const io = req.app.get('io');
    // io.emit("goalUpdated");

    res.status(200).json({
        data: goals,
        message: "Goal fetched successfully",
        success: true,
        statusCode: 200
    })
}

// const updateUserAPI = async (req: Request, res: Response) => {
//     try {
//         const { username, email } = req.body;
//         const { id } = req.params;

//         const userUpdated = await handleUpdateUser(+id, username, email);

//         res.status(200).json({
//             data: userUpdated,
//             message: "User updated successfully",
//             success: true,
//             statusCode: 200
//         })
//     } catch (error) {
//         return res.status(500).json({
//             message: "Update User Failed",
//             error: (error as Error).message
//         });
//     }
// }

const deleteGoalAPI = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const goals = await handleDeleteGoal(+id);

        // const io = req.app.get('io');
        // io.emit("goalUpdated");  // truyền (phát) về cho client biết 

        res.status(200).json({
            data: goals,
            message: "Goal deleted successfully",
            success: true,
            statusCode: 200
        })
    } catch (error) {
        res.status(500).json({
            message: "Goal Deleted Failed", error
        });
    }
}

const uploadFileBackgroundAPI = async (req: Request, res: Response) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                message: "No file uploaded",
                success: false
            });
        }

        res.status(200).json({
            fileUploaded: req.file.filename,
            message: "File uploaded successfully",
            success: true
        });
    } catch (error) {
        res.status(500).json({
            message: "Upload file failed",
            error: (error as Error).message
        });
    }
}

const createGoalAPI = async (req: Request, res: Response) => {
    try {
        let { title, description, startDate, endDate, isPublic } = req.body;
        const idUser = req.user!.id;

        if (!title || !description || !startDate || !endDate) {
            return res.status(400).json({
                message: "Title, description and date (start - end) are required"
            });
        }

        isPublic = isPublic === true || isPublic === 'true';

        // Validation date cũ, đã chuyển thành hàm deadlineValidation
        //  const now = dayjs().startOf('day');
        //  startDate = dayjs(startDate).startOf('day');
        //  endDate = dayjs(endDate).startOf('day');
        // if (startDate.isBefore(now)) {
        //     return res.status(400).json({
        //         message: "Start date must start from today"
        //     });
        // }

        // if (!startDate.isBefore(endDate)) {
        //     return res.status(400).json({
        //         message: "Start date must be before end date"
        //     });
        // }

        const checkDeadline = deadlineValidation(startDate, endDate);
        if (!checkDeadline.valid) {
            return res.status(400).json({ message: checkDeadline.error });
        }

        const file = req.file;
        const backgroundFileUpload = file?.filename ?? "background_default.jpg";

        const newGoal = await handleCreateGoal(+idUser, title, description, isPublic, checkDeadline.startDate, checkDeadline.endDate, backgroundFileUpload);
        // const io = req.app.get('io');
        // io.emit("goalUpdated");

        return res.status(201).json({
            data: newGoal,
            message: "Goal created successfully",
            success: true,
            statusCode: 201
        })
    } catch (error) {
        console.log(">>> controller: ", error);
        return res.status(500).json({
            message: "Create Goal Failed",
            error: (error as Error).message
        });
    }
}

// Type of Goal
const getAllTypeofGoalAPI = async (req: Request, res: Response) => {
    try {
        const types = await handleGetAllTypeofGoal();
        res.status(200).json({
            data: types,
            success: true,
            statusCode: 200
        })

    } catch (error) {
        res.status(500).json({
            message: "Cannot get Type of this Goal", error
        });
    }
}

const getTypeofGoalByIdAPI = async (req: Request, res: Response) => {
    try {
        const { idGoal } = req.params;
        const types = await handleGetTypeofGoal(+idGoal);
        res.status(200).json({
            data: types,
            success: true,
            statusCode: 200
        })

    } catch (error) {
        res.status(500).json({
            message: "Cannot get Type of this Goal", error
        });
    }
}

const addTypeofGoalToGoalTypeAPI = async (req: Request, res: Response) => {
    try {
        const { idTypeGoal, idGoal } = req.body;
        const types = await handleAddTypeofGoalToGoalType(+idTypeGoal, +idGoal);
        res.status(201).json({
            data: types,
            success: true,
            statusCode: 201
        })

    } catch (error) {
        res.status(500).json({
            message: "Cannot create a new Type of Goal", error
        });
    }
}

const createNewTypeofGoalAPI = async (req: Request, res: Response) => {
    try {
        const { idGoal } = req.params;
        const { nameType, theme } = req.body;
        const types = await handleCreateTypeofGoal(nameType, theme, +idGoal);
        res.status(201).json({
            data: types,
            success: true,
            statusCode: 201
        })

    } catch (error: any) {
        // res.status(500).json({
        //     message: "Cannot create a new Type of Goal", error
        // });
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === "P2002") {
                return res.status(400).json({
                    message: "Tên Type đã tồn tại, vui lòng nhập tên khác",
                    field: error.meta?.target,
                    success: false,
                    statusCode: 400
                });
            }
        }
        return res.status(500).json({
            message: "Cannot create a new Type of Goal",
            error: error.message,
            success: false,
            statusCode: 500
        });
    }
}

const updateTypeofGoalAPI = async (req: Request, res: Response) => {
    try {
        const { idTypeGoal } = req.params;
        const { nameType, theme } = req.body;
        const types = await handleUpdateTypeofGoal(+idTypeGoal, nameType, theme);
        res.status(200).json({
            data: types,
            success: true,
            statusCode: 200
        })

    } catch (error) {
        res.status(500).json({
            message: "Cannot update this Type of Goal", error
        });
    }
}

const deleteAllTypeofGoalAPI = async (req: Request, res: Response) => {
    try {
        const { idTypeGoal } = req.params;
        const types = await handleDeleteAllTypeofGoal(+idTypeGoal);
        res.status(200).json({
            data: types,
            success: true,
            statusCode: 200
        })

    } catch (error) {
        res.status(500).json({
            message: "Cannot delete this Type of Goal", error
        });
    }
}

const deleteTypeofGoalOnGoalTypeAPI = async (req: Request, res: Response) => {
    try {
        const { idGoal, idTypeGoal } = req.body;
        const types = await handleDeleteTypeofGoalOnGoalType(+idTypeGoal, +idGoal);
        res.status(200).json({
            data: types,
            success: true,
            statusCode: 200
        })

    } catch (error) {
        res.status(500).json({
            message: "Cannot delete this Type of Goal", error
        });
    }
}

export {
    updateGoalAPI, getAllGoalAPI, getGoalByIdAPI, deleteGoalAPI, createGoalAPI,
    getTypeofGoalByIdAPI, getAllGoalByUserIdAPI, uploadFileBackgroundAPI, getAllTypeofGoalAPI,
    createNewTypeofGoalAPI, updateTypeofGoalAPI, deleteTypeofGoalOnGoalTypeAPI, deleteAllTypeofGoalAPI,
    addTypeofGoalToGoalTypeAPI
}