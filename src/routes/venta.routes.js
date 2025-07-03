import { Router } from "express";
import getVentas from "../controllers/Venta/getVentas.controller.js";
import updateVenta from "../controllers/Venta/updateVenta.controller.js";


const routesVenta = Router();

routesVenta.get("/get_ventas", getVentas);
routesVenta.put("/update_venta/:id", updateVenta);



export default routesVenta;
