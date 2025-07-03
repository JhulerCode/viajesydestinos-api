import { Router } from "express";
import crearCategoria from "../controllers/Categoria/createCategoria.controller.js";
import getCategorias from "../controllers/Categoria/getCategoria.controller.js";
import deleteCategoria from "../controllers/Categoria/deleteCategoria.controller.js";
import { authenticateToken, verificarRol } from "../controllers/Autenticacion/AuthToken.controller.js";
import actualizarCategoria from "../controllers/Categoria/updateCategoria.controller.js";
import getPaquetesCategorias from "../controllers/Categoria/getPaquetesCategoria.controller.js";

const routesCategorias = Router();


routesCategorias.get('/get_categorias',getCategorias);
routesCategorias.get('/get_paquetes_categorias',getPaquetesCategorias);


routesCategorias.post('/create_categoria',authenticateToken,verificarRol(['admin','editor','superadmin']), crearCategoria);
routesCategorias.put('/update_categoria/:id',authenticateToken,verificarRol(['admin','editor','superadmin']), actualizarCategoria);

routesCategorias.delete('/delete_categoria/:id',authenticateToken,verificarRol(['admin','editor','superadmin']), deleteCategoria);


export default routesCategorias;