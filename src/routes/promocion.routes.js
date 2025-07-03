import { Router } from "express";

import createPromocion from "../controllers/Promocion/createPromocion.controller.js";
import getPromociones from "../controllers/Promocion/getPromociones.controller.js";
import deletePromocion from "../controllers/Promocion/deletePromocion.controller.js";
import updatePromocion from "../controllers/Promocion/updatePromocion.controller.js";
import getPromocion from "../controllers/Promocion/getPromocion.controller.js";
import { authenticateToken, verificarRol } from "../controllers/Autenticacion/AuthToken.controller.js";

const routesPromocion = Router();

routesPromocion.get("/get_promociones",authenticateToken,verificarRol(['admin','editor','superadmin']), getPromociones);
routesPromocion.get("/get_promocion", getPromocion);


routesPromocion.post("/create_promocion",authenticateToken,verificarRol(['admin','editor','superadmin']), createPromocion);
routesPromocion.delete("/delete_promocion/:id",authenticateToken,verificarRol(['admin','editor','superadmin']), deletePromocion);
routesPromocion.put("/update_promocion/:id",authenticateToken,verificarRol(['admin','editor','superadmin']), updatePromocion);

export default routesPromocion;