// // controllers/programaController.js
// import fs from 'fs';
// import path from 'path';
// import { fileURLToPath } from 'url';
// import { v4 as uuidv4 } from 'uuid';
// import Programa from '../../models/ProgramaSchema.js';

// // Para obtener la ruta del directorio actual en módulos ES
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// // URL base del servidor
// // const SERVER_URL = 'http://your-server-domain.com'; // Cambia esto a tu dominio o dirección IP
// const SERVER_URL = 'https://app.viajesydestinos.travel'; // Cambia esto a tu dominio o dirección IP


// export const subirPrograma = async (req, res) => {
//   try {
//     if (!req.files || Object.keys(req.files).length === 0) {
//       return res.status(400).json({ message: 'No files were uploaded.' });
//     }

//     const pdfFile = req.files.file;
//     console.log(pdfFile)

//     if (pdfFile.mimetype !== 'application/pdf') {
//       return res.status(400).json({ message: 'Please upload a PDF file.' });
//     }

//     const uploadDir = path.join(__dirname, '../../', 'uploads', 'programas');
    
//     // Crear la carpeta si no existe
//     if (!fs.existsSync(uploadDir)) {
//       fs.mkdirSync(uploadDir, { recursive: true });
//     }

//     const fileName = pdfFile.name;
//     const filePath = path.join(uploadDir, fileName);

//     pdfFile.mv(filePath, async (err) => {
//       if (err) {
//         return res.status(500).json({ message: 'File upload failed.', error: err });
//       }

//       const fileUrl = `${SERVER_URL}/uploads/programas/${fileName}`;
//       const newPrograma = new Programa({
//         url: fileUrl,
//         nombre: pdfFile.name,
//       });

//       await newPrograma.save();

//       res.status(200).json({ message: 'File uploaded successfully.', programa: newPrograma });
//     });
//   } catch (error) {
//     res.status(500).json({ message: 'An error occurred.', error });
//   }
// };



import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { v4 as uuidv4 } from 'uuid';
import Programa from '../../models/ProgramaSchema.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SERVER_URL = 'https://app.viajesydestinos.travel'; // Cambia esto a tu dominio o dirección IP

// Función para sanitizar y renombrar archivos
function sanitizeFileName(fileName) {
    return fileName
        .trim() // Elimina espacios en blanco al inicio y al final
        .replace(/\s+/g, '_') // Reemplaza espacios con guiones bajos
        .replace(/[^a-zA-Z0-9_.-]/g, ''); // Elimina caracteres especiales
}

export const subirPrograma = async (req, res) => {
    try {
        if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).json({ message: 'No files were uploaded.' });
        }

        const pdfFile = req.files.file;

        if (pdfFile.mimetype !== 'application/pdf') {
            return res.status(400).json({ message: 'Please upload a PDF file.' });
        }

        const uploadDir = path.join(__dirname, '../../', 'uploads', 'programas');

        // Crear la carpeta si no existe
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }

        let sanitizedFileName = sanitizeFileName(pdfFile.name);
        let filePath = path.join(uploadDir, sanitizedFileName);

        // Si el archivo ya existe, genera un nombre único
        if (fs.existsSync(filePath)) {
            const uniqueName = `${uuidv4()}_${sanitizedFileName}`;
            filePath = path.join(uploadDir, uniqueName);
            sanitizedFileName = uniqueName;
        }

        pdfFile.mv(filePath, async (err) => {
            if (err) {
                return res.status(500).json({ message: 'File upload failed.', error: err });
            }

            const fileUrl = `${SERVER_URL}/uploads/programas/${sanitizedFileName}`;
            const newPrograma = new Programa({
                url: fileUrl,
                nombre: sanitizedFileName,
            });

            await newPrograma.save();

            res.status(200).json({ message: 'File uploaded successfully.', programa: newPrograma });
        });
    } catch (error) {
        res.status(500).json({ message: 'An error occurred.', error });
    }
};

