import { Router } from "express";
// import multer from "multer";
import path from "path";

import { fileURLToPath } from 'url';
import { subirPrograma } from "../controllers/Programa/SubirPrograma.controller.js";
import deletePrograma from "../controllers/Programa/DeletePrograma.controller.js";
// import subirPrograma from "../controllers/Programa/SubirPrograma.controller.js";
// Utilidades para __dirname con ES Module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuración de multer para guardar archivos en memoria
// const storage = multer.memoryStorage();
// const upload = multer({ storage });

const routesPrograma = Router();

// Rutas
routesPrograma.post("/subir_programa", subirPrograma);
routesPrograma.delete("/delete_programa/:id", deletePrograma);


export default routesPrograma;
