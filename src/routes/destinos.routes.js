import { Router } from "express";
import getDestinos from "../controllers/Destinos/getDestinos.controller.js";
import createDestino from "../controllers/Destinos/createDestino.controller.js";

const routesDestinos = Router();

routesDestinos.get('/get_destinos', getDestinos);
routesDestinos.post('/create_destino', createDestino);

export default routesDestinos;