// import express from 'express';
// import multer from 'multer';
// import path from 'path';

// const router = express.Router();

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, 'uploads/'); // nơi lưu file
//     },
//     filename: function (req, file, cb) {
//         const uniqueName = Date.now() + '-' + file.originalname;
//         cb(null, uniqueName);
//     }
// });

// const upload = multer({ storage: storage });

// router.post('/upload', upload.single('file'), (req, res) => {
//     if (!req.file) {
//         return res.status(400).json({ message: 'No file uploaded' });
//     }

//     const imageUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
//     res.status(200).json({ imageUrl });
// });

// export default router;
