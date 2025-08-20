import multer from 'multer'
import path from 'path'
import { v4 } from 'uuid';
import fs from 'fs';


const fileUploadMiddleware = (fieldName: string, dir: string = 'backgroundGoal') => {
    const upload = multer({
        storage: multer.diskStorage({
            // destination: 'public/images/' + dir, <-- basic way
            destination: (req, file, cb) => {
                // Lấy folder từ header folder-upload, nếu không có thì dùng defaultDir
                const folderFromHeader = req.headers['folder-upload'] as string;
                const finalDir = folderFromHeader || dir;

                const fullPath = path.join('public/images/', finalDir);

                // Tạo folder nếu chưa có
                if (!fs.existsSync(fullPath)) {
                    fs.mkdirSync(fullPath, { recursive: true });
                }

                cb(null, fullPath);
            },
            filename: (req, file, cb) => {
                const extension = path.extname(file.originalname); // get tail of file name (.png, .jpg)
                console.log(">>> check extension: ", extension);
                cb(null, v4() + extension);
            }
        }),
        limits: {
            fileSize: 1024 * 1024 * 3 // 3MB
            // fileSize: 1024 // 3MB
        },
        fileFilter: (req: Express.Request, file: Express.Multer.File, cb: Function) => {
            if (
                file.mimetype === 'image/png' ||
                file.mimetype === 'image/jpg' ||
                file.mimetype === 'image/jpeg'
            ) {
                cb(null, true);
            } else {
                cb(new Error('Only JPEG and PNG images are allowed.'), false);
            }
        },
    }).single(fieldName);


    return (req: any, res: any, next: any) => {
        upload(req, res, (err: any) => {
            if (err instanceof multer.MulterError) {
                if (err.code === 'LIMIT_FILE_SIZE') {
                    return res.status(500).json({
                        data: null,
                        message: "File quá lớn (tối đa 3MB)",
                        success: false,
                        statusCode: 500,
                        error: (err as Error).message
                    });
                }
                return res.status(400).json({ message: err.message || 'Lỗi upload file' });
            }
            next();
        });
    };
}

export default fileUploadMiddleware;
