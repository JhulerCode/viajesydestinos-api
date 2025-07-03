import express from "express";
import morgan from "morgan";
import cors from "cors";
import path from "path";
import fileUpload from "express-fileupload";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";
import multer from "multer";

import routesUsuario from "./routes/usuario.routes.js";
import routesPayment from "./routes/payment.routes.js";
import routesPaquetes from "./routes/paquetes.routes.js";
import routesDestinos from "./routes/destinos.routes.js";
import routesCarrito from "./routes/carrito.routes.js";
import routesCategorias from "./routes/categoria.routes.js";

import routesPromocion from "./routes/promocion.routes.js";
import routesTestimonio from "./routes/testimonio.routes.js";
import routesSlider from "./routes/slider.routes.js";
import routesMotor from "./routes/motor.routes.js";
import routesImage from "./routes/image.routes.js";
import routesPrograma from "./routes/programa.routes.js";
import routesImageOtros from "./routes/imagesOtros.routes.js";
import routesVenta from "./routes/venta.routes.js";

const app = express();

// Utilidades para obtener el directorio actual con ES Module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


// Configuración de middleware
app.use(fileUpload());
app.use(express.static("public")); // Servir archivos estáticos desde la carpeta 'public'
app.use(morgan("dev")); // Logging de peticiones HTTP en consola
app.use(express.json()); // Parseo de body en formato JSON
app.use(express.urlencoded({ extended: false })); // Parseo de body en formato URL-encoded
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// app.use(cors());
// Configurar CORS
const corsOptions = {
  // origin:"http://localhost:5173",
  origin: ['https://viajesydestinos.travel', 'https://www.viajesydestinos.travel'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

// Aplicar el middleware CORS
app.use(cors(corsOptions));
// Rutas de la API
// Servir archivos estáticos desde el directorio 'dist' en 'cliente'
// app.use(express.static(path.join(__dirname, "../../cliente/dist")));


app.use("/api", routesUsuario);
app.use("/api", routesPayment);
app.use("/api", routesPaquetes);
app.use("/api", routesDestinos);
app.use("/api", routesCarrito);
app.use("/api", routesCategorias);

app.use("/api", routesPromocion);
app.use("/api", routesTestimonio);
app.use("/api", routesSlider);
app.use("/api", routesMotor);
app.use("/api", routesImage);
app.use("/api", routesPrograma);
app.use("/api", routesImageOtros);
app.use("/api", routesVenta);
// Configuración para servir archivos estáticos desde el directorio 'uploads'
app.use("/uploads", express.static(path.join(__dirname, "./uploads")));


// Servir el front-end para todas las rutas no manejadas por la API
// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "../../cliente/dist", "index.html"));
// });
// Middleware para manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

// Ruta de bienvenida
app.get("/", (req, res) => {
  res.send("Bienvenido al API de Viajes y Destinos");
});

export default app;
