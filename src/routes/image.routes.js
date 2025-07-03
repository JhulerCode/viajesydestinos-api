import express from 'express';

import getImages from '../controllers/Image/getImages.controller.js';
import createImage from '../controllers/Image/CreateImage.controller.js';
import deleteImage from '../controllers/Image/deleteImage.controller.js';



const routesImage = express.Router();

// Middleware para manejar datos de formulario multipartes y JSON
routesImage.use(express.urlencoded({ extended: true }));
routesImage.use(express.json());

routesImage.post('/subir_imagenes', createImage);

routesImage.get('/get_images', getImages)
routesImage.delete('/delete_image/:id', deleteImage)

export default routesImage;
