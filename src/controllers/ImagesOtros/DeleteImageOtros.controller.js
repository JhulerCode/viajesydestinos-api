import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import ImagesOtros from "../../models/ImagesOtrosSchema.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const deleteImageOtros = async (req, res) => {
  try {
    const { id } = req.params;

    // Buscar la imagen en la base de datos por su ID
    const image = await ImagesOtros.findById(id);
    if (!image) {
      return res.status(404).json({ mensaje: "Imagen no encontrada" });
    }

    // Obtener la ruta completa de la imagen en el servidor
    const imagePath = path.join(__dirname, `../../uploads/imagesOtros/${path.basename(image.url)}`);

    // Eliminar la imagen del servidor
    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
    }

    // Eliminar la imagen de la base de datos
    await ImagesOtros.findByIdAndDelete(id);

    return res.status(200).json({ mensaje: "Imagen eliminada exitosamente" });
  } catch (error) {
    console.error("Error al eliminar la imagen:", error);
    return res.status(500).json({ mensaje: "Error al eliminar la imagen" });
  }
};

export default deleteImageOtros;
