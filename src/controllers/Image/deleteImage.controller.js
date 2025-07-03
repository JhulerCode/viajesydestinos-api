import Image from "../../models/ImageSchema.js";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const deleteImage = async (req, res) => {
  const { id } = req.params;
  try {
    // Encontrar la imagen en la base de datos
    const imageToDelete = await Image.findById(id);

    if (!imageToDelete) {
      return res.status(404).json({ mensaje: "Imagen no encontrada" });
    }

    // Obtener la ruta completa de la imagen en el servidor
    const imagePath = path.join(__dirname, `../../uploads/images/${path.basename(imageToDelete.url)}`);

    // Eliminar la imagen del servidor
    fs.unlink(imagePath, (err) => {
      if (err) {
        console.error("Error al eliminar la imagen del servidor:", err);
        return res.status(500).json({ mensaje: "Error al eliminar la imagen del servidor" });
      }
    });

    // Eliminar la imagen de la base de datos
    await Image.findByIdAndDelete(id);

    res.status(200).json({ mensaje: "Imagen eliminada exitosamente" });
  } catch (error) {
    console.error("Error al eliminar la imagen:", error);
    res.status(500).json({ mensaje: "Error al eliminar la imagen" });
  }
};

export default deleteImage;
