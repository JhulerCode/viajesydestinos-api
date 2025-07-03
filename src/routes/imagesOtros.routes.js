import express from 'express';
import createImageOtros from '../controllers/ImagesOtros/CreateImageOtros.controller.js';
import deleteImageOtros from '../controllers/ImagesOtros/DeleteImageOtros.controller.js';



const routesImageOtros = express.Router();

// Middleware para manejar datos de formulario multipartes y JSON
routesImageOtros.use(express.urlencoded({ extended: true }));
routesImageOtros.use(express.json());

routesImageOtros.post('/subir_imagenes_otros', createImageOtros);
routesImageOtros.delete('/delete_imagenes_otros/:id', deleteImageOtros);


// routesImageOtros.get('/get_images', getImages)
// routesImageOtros.delete('/delete_image_otros/:id', deleteImage)

export default routesImageOtros;