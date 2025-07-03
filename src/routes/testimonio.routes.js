import { Router } from "express";

import { authenticateToken, verificarRol } from "../controllers/Autenticacion/AuthToken.controller.js";
import getTestimonios from "../controllers/Testimonio/getTestimonios.controller.js";
import createTestimonio from "../controllers/Testimonio/createTestimonio.controller.js";
import deleteTestimonio from "../controllers/Testimonio/deleteTestimonio.controller.js";
import updateTestimonio from "../controllers/Testimonio/updateTestimonio.controller.js";
import getTestimoniosFront from "../controllers/Testimonio/getTestimoniosFront.controller.js";


const routesTestimonio = Router();

routesTestimonio.get("/get_testimonios", getTestimonios);
routesTestimonio.get("/get_testimoniosfront", getTestimoniosFront);


routesTestimonio.post("/create_testimonio",authenticateToken,verificarRol(['admin','editor','superadmin']), createTestimonio);
routesTestimonio.delete("/delete_testimonio/:id",authenticateToken,verificarRol(['admin','editor','superadmin']), deleteTestimonio);
routesTestimonio.put("/update_testimonio/:id",authenticateToken,verificarRol(['admin','editor','superadmin']), updateTestimonio);

export default routesTestimonio;
