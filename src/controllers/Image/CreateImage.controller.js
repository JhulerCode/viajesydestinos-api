import Image from "../../models/ImageSchema.js";
import path from "path";
import { fileURLToPath } from "url";

import { v4 as uuidv4 } from "uuid";

import { config } from "dotenv";
import fs from "fs";

config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// // Obtener el dominio desde una variable de entorno o desde la solicitud HTTP
// const DOMAIN = process.env.DOMAIN || "http://localhost:3001";

const createImage = async (req, res) => {
  try {
    // Verificar si hay archivos en la solicitud
    if (!req.files || Object.keys(req.files).length === 0) {
      return res
        .status(400)
        .json({ mensaje: "No se subieron los archivos correctamente" });
    }

    // Verificar y crear el directorio de imágenes si no existe
    const directory = path.join(__dirname, "../../uploads/images");
    if (!fs.existsSync(directory)) {
      fs.mkdirSync(directory, { recursive: true });
    }

    // Recorrer los archivos recibidos
    const files = Object.values(req.files);
    console.log("Archivos recibidos:", files);
   console.log(Object.keys(files).length )
    const savedImages = [];
    if (Array.isArray(files) && files[0].length  > 1) {
      // Array para almacenar los objetos de imágenes que se guardarán en la base de datos

      // Procesar cada archivo recibido
      for (const fileArray of files) {
        for (const file of fileArray) {
          // Generar un nombre único para el archivo usando UUID
          const uniqueFilename = `${uuidv4()}-${file.name}`;

          // Construir la URL de la imagen
          const imageUrl = `${req.protocol}://${req.get(
            "host"
          )}/uploads/images/${uniqueFilename}`;

          // Guardar la imagen en el servidor
          await file.mv(
            path.join(__dirname, `../../uploads/images/${uniqueFilename}`)
          );

          // Crear un nuevo objeto Image para guardar en la base de datos
          const newImage = new Image({
            nombre: file.name,
            url: imageUrl,
            // Otros campos según sea necesario
          });

          // Guardar la imagen en MongoDB
          const savedImage = await newImage.save();
          savedImages.push(savedImage);
        }
      }
    } else {
        // Generar un nombre único para el archivo usando UUID
        const uniqueFilename = `${uuidv4()}-${files[0].name}`;
         // Construir la URL de la imagen
         const imageUrl = `${req.protocol}://${req.get(
            "host"
          )}/uploads/images/${uniqueFilename}`;

          // Guardar la imagen en el servidor
          await files[0].mv(
            path.join(__dirname, `../../uploads/images/${uniqueFilename}`)
          );

         // Crear un nuevo objeto Image para guardar en la base de datos
         const newImage = new Image({
            nombre: files[0].name,
            url: imageUrl,
            // Otros campos según sea necesario
          });

          const savedImage = await newImage.save()
          savedImages.push(savedImage);

    }

    return res.status(201).json({
      mensaje: "Imágenes subidas exitosamente",
      imagenes: savedImages,
    });
  } catch (error) {
    console.error("Error al procesar las imágenes:", error);
    return res.status(500).json({ mensaje: "Error al procesar las imágenes" });
  }
};

export default createImage;
