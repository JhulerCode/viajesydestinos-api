import { Router } from "express";
import { createPayment, notificationIPN, validatePayment } from "../controllers/Payment/payment.controller.js";

const routesPayment = Router();

routesPayment.post("/createPayment", createPayment);
routesPayment.post("/validatePayment", validatePayment);
routesPayment.post("/ipn", notificationIPN);

export default routesPayment;
