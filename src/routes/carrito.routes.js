import { Router } from "express";
import getCarrito from "../controllers/Carrito/getCarritoId.controller.js";
import createCarrito from "../controllers/Carrito/createCarrito.controller.js";

const routesCarrito = Router();

routesCarrito.get('/get_carrito', getCarrito);
routesCarrito.post('/create_carrito', createCarrito);

export default routesCarrito;