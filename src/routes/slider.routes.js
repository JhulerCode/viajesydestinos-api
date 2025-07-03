import { Router } from "express";

import { authenticateToken, verificarRol } from "../controllers/Autenticacion/AuthToken.controller.js";
import getSliders from "../controllers/Slider/getSlidersAdmin.controller.js";
import getSlidersAdmin from "../controllers/Slider/getSlidersAdmin.controller.js";
import createSlider from "../controllers/Slider/createSlider.controller.js";
import deleteSlider from "../controllers/Slider/deleteSlider.controller.js";
import updateSlider from "../controllers/Slider/updateSlider.controller.js";

const routesSlider = Router();

// routesSlider.get("/get_sliders_admin",authenticateToken,verificarRol(['admin','editor','superadmin']), getSlidersAdmin);
// routesSlider.get("/get_sliders", getSliders);


// routesSlider.post("/create_slider",authenticateToken,verificarRol(['admin','editor','superadmin']), createSlider);
// routesSlider.delete("/delete_slider/:id",authenticateToken,verificarRol(['admin','editor','superadmin']), deleteSlider);
// routesSlider.put("/update_slider/:id",authenticateToken,verificarRol(['admin','editor','superadmin']), updateSlider);


routesSlider.get("/get_sliders_admin", getSlidersAdmin);
routesSlider.get("/get_sliders", getSliders);


routesSlider.post("/create_slider", createSlider);
routesSlider.delete("/delete_slider/:id", deleteSlider);
routesSlider.put("/update_slider/:id", updateSlider);
export default routesSlider;