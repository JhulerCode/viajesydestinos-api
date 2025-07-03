// // middlewares/uploadMiddleware.js
// const multer = require('multer');
// const path = require('path');
// const fs = require('fs');
// import path from 'path';
// import { fileURLToPath } from 'url';
// import multer from 'multer';

// import { config } from "dotenv";

// config();


// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     const uploadDir = path.join(__dirname, '..', 'uploads', 'programas');
//     fs.mkdirSync(uploadDir, { recursive: true }); // Crea la carpeta si no existe
//     cb(null, uploadDir);
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + '-' + file.originalname);
//   }
// });

// const upload = multer({ storage });

// module.exports = upload;
