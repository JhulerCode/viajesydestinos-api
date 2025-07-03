// import path from "path";
// import { fileURLToPath } from "url";
// import { v4 as uuidv4 } from "uuid";
// import { config } from "dotenv";
// import fs from "fs";
// import ImagesOtros from "../../models/ImagesOtrosSchema.js";

// config();

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// const createImageOtros = async (req, res) => {
//   try {
//     // Verificar si hay archivos en la solicitud
//     if (!req.files || !req.files.image) {
//       return res
//         .status(400)
//         .json({ mensaje: "No se subió ningún archivo correctamente" });
//     }

//     const file = req.files.image;

//     // Verificar si una imagen con el mismo nombre ya existe en la base de datos
//     const existingImage = await ImagesOtros.findOne({ nombre: file.name });
//     if (existingImage) {
//       return res.status(201).json({
//         mensaje: "Una imagen con el mismo nombre ya existe",
//         imagen: existingImage,
//       });
//     }

//     // Verificar y crear el directorio de imágenes si no existe
//     const directory = path.join(__dirname, "../../uploads/imagesOtros");
//     if (!fs.existsSync(directory)) {
//       fs.mkdirSync(directory, { recursive: true });
//     }

//     // Generar un nombre único para el archivo usando UUID
//     const uniqueFilename = `${uuidv4()}-${file.name}`;

//     // Construir la URL de la imagen
//     const imageUrl = `${req.protocol}://${req.get("host")}/uploads/imagesOtros/${uniqueFilename}`;

//     // Guardar la imagen en el servidor
//     await file.mv(path.join(__dirname, `../../uploads/imagesOtros/${uniqueFilename}`));

//     // Crear un nuevo objeto Image para guardar en la base de datos
//     const newImage = new ImagesOtros({
//       nombre: file.name,
//       url: imageUrl,
//       // Otros campos según sea necesario
//     });

//     // Guardar la imagen en MongoDB
//     const savedImage = await newImage.save();

//     return res.status(201).json({
//       mensaje: "Imagen subida exitosamente",
//       imagen: savedImage,
//     });
//   } catch (error) {
//     console.error("Error al procesar la imagen:", error);
//     return res.status(500).json({ mensaje: "Error al procesar la imagen" });
//   }
// };

// export default createImageOtros;

// import path from "path";
// import { fileURLToPath } from "url";
// import { v4 as uuidv4 } from "uuid";
// import { config } from "dotenv";
// import fs from "fs";
// import ImagesOtros from "../../models/ImagesOtrosSchema.js";

// config();

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// const createImageOtros = async (req, res) => {
//   try {
//     // Verificar si hay archivos en la solicitud
//     if (!req.files || !req.files.image) {
//       return res
//         .status(400)
//         .json({ mensaje: "No se subió ningún archivo correctamente" });
//     }

//     const file = req.files.image;

//     // Verificar si una imagen con el mismo nombre ya existe en la base de datos
//     const existingImage = await ImagesOtros.findOne({ nombre: file.name });
//     if (existingImage) {
//       return res.status(201).json({
//         mensaje: "Una imagen con el mismo nombre ya existe",
//         imagen: existingImage,
//       });
//     }

//     // Verificar y crear el directorio de imágenes si no existe
//     const directory = path.resolve(__dirname, "../../uploads/imagesOtros");
//     if (!fs.existsSync(directory)) {
//       fs.mkdirSync(directory, { recursive: true });
//     }

//     // Generar un nombre único para el archivo usando UUID
//     const uniqueFilename = `${uuidv4()}-${file.name}`;

//     // Construir la URL de la imagen
//     const imageUrl = `${req.protocol}://${req.get("host")}/uploads/imagesOtros/${uniqueFilename}`;

//     // Guardar la imagen en el servidor
//     await fs.promises.rename(file.tempFilePath, path.join(directory, uniqueFilename));

//     // Crear un nuevo objeto Image para guardar en la base de datos
//     const newImage = new ImagesOtros({
//       nombre: file.name,
//       url: imageUrl,
//       // Otros campos según sea necesario
//     });

//     // Guardar la imagen en MongoDB
//     const savedImage = await newImage.save();

//     return res.status(201).json({
//       mensaje: "Imagen subida exitosamente",
//       imagen: savedImage,
//     });
//   } catch (error) {
//     console.error("Error al procesar la imagen:", error);
//     return res.status(500).json({ mensaje: "Error al procesar la imagen" });
//   }
// };

// export default createImageOtros;

import path from "path";
import { fileURLToPath } from "url";
import { v4 as uuidv4 } from "uuid";
import { config } from "dotenv";
import fs from "fs";
import ImagesOtros from "../../models/ImagesOtrosSchema.js";

config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const createImageOtros = async (req, res) => {
  try {
    // Verificar si hay archivos en la solicitud
    if (!req.files || !req.files.image) {
      return res
        .status(400)
        .json({ mensaje: "No se subió ningún archivo correctamente" });
    }

    const file = req.files.image;

    // Verificar si una imagen con el mismo nombre ya existe en la base de datos
    const existingImage = await ImagesOtros.findOne({ nombre: file.name });
    if (existingImage) {
      return res.status(201).json({
        mensaje: "Una imagen con el mismo nombre ya existe",
        imagen: existingImage,
      });
    }

    // Verificar y crear el directorio de imágenes si no existe
    const directory = path.join(__dirname, "../../uploads/imagesOtros");
    if (!fs.existsSync(directory)) {
      fs.mkdirSync(directory, { recursive: true });
    }

    // Generar un nombre único para el archivo usando UUID
    const uniqueFilename = `${uuidv4()}-${file.name}`;

    // Construir la ruta completa del archivo en el servidor
    const filePath = path.join(directory, uniqueFilename);

    try {
      // Guardar la imagen en el servidor
      await file.mv(filePath);

      // Construir la URL completa de la imagen
      const imageUrl = `${req.protocol}://${req.get(
        "host"
      )}/uploads/imagesOtros/${uniqueFilename}`;

      // Crear un nuevo objeto Image para guardar en la base de datos
      const newImage = new ImagesOtros({
        nombre: file.name,
        url: imageUrl,
        // Otros campos según sea necesario
      });

      // Guardar la imagen en MongoDB
      const savedImage = await newImage.save();

      return res.status(201).json({
        mensaje: "Imagen subida exitosamente",
        imagen: savedImage,
      });
    } catch (error) {
      console.error("Error al procesar la imagen:", error);
      return res.status(500).json({ mensaje: "Error al procesar la imagen" });
    }
  } catch (error) {
    console.error("Error al procesar la solicitud:", error);
    return res.status(500).json({ mensaje: "Error al procesar la solicitud" });
  }
};

export default createImageOtros;
