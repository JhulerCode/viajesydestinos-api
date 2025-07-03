import { Router } from "express";


import { authenticateToken, verificarRol } from "../controllers/Autenticacion/AuthToken.controller.js";
import getMotor from "../controllers/Motor/geMotorFondo.controller.js";
import createMotor from "../controllers/Motor/createMotorFondo.controller.js";
import deleteMotor from "../controllers/Motor/deleteMotorFondo.controller.js";
import updateMotor from "../controllers/Motor/updateMotorFondo.controller.js";

const routesMotor = Router();


routesMotor.get("/get_motor", getMotor);


routesMotor.post("/create_motor",authenticateToken,verificarRol(['admin','editor','superadmin']), createMotor);
routesMotor.delete("/delete_motor/:id",authenticateToken,verificarRol(['admin','editor','superadmin']), deleteMotor);
routesMotor.put("/update_motor/:id",authenticateToken,verificarRol(['admin','editor','superadmin']), updateMotor);

export default routesMotor;