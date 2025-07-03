import { Router } from "express";
import getPaquetes from "../controllers/Paquetes/getPaquetes.controller.js";
import createPaquete from "../controllers/Paquetes/createPaquete.controller.js";
import updatePaquete from "../controllers/Paquetes/updatePaquete.controller.js";
import { authenticateToken, verificarRol } from "../controllers/Autenticacion/AuthToken.controller.js";
import deletePaquete from "../controllers/Paquetes/deletePaquete.controller.js";
import getPaqueteId from "../controllers/Paquetes/getPaqueteId.controller.js";
import getPaquetesAdmin from "../controllers/Paquetes/getPaquetesAdmin.controller.js";
import toggleActivo from "../controllers/Paquetes/toggleActivo.controller.js";
import toggleCompra from "../controllers/Paquetes/toggleCompra.controller.js";

const routesPaquetes = Router();

routesPaquetes.get('/get_paquetes', getPaquetes);
routesPaquetes.get('/get_paquetes_admin', getPaquetesAdmin);

routesPaquetes.get('/get_paquete/:id', getPaqueteId);

routesPaquetes.post('/toggle_activo/:id', toggleActivo);
routesPaquetes.post('/toggle_compra/:id', toggleCompra);



// routesPaquetes.post('/create_paquete',authenticateToken,verificarRol(['admin','editor','superadmin']), createPaquete);
routesPaquetes.post('/create_paquete', createPaquete);
routesPaquetes.delete('/delete_paquete/:id',deletePaquete);


// routesPaquetes.put('/update_paquete/:id',authenticateToken,verificarRol(['admin','editor','superadmin']),updatePaquete );
routesPaquetes.put('/update_paquete/:id',updatePaquete );



export default routesPaquetes;