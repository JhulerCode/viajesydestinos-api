import Promocion from "../../models/PromocionSchema.js";
import fs from "fs";
import { fileURLToPath } from "url";
import path from "path";
import ImagesOtros from "../../models/ImagesOtrosSchema.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const deletePromocion = async (req, res) => {
  const { id } = req.params;
  try {
    // Buscar la promoción por su ID para obtener la imagen asociada
    const promocion = await Promocion.findById(id);
    console.log(promocion);
    if (!promocion) {
      return res.status(404).json({ message: "Promoción no encontrada" });
    }

    // Verificar si la promoción tiene una imagen asociada
    if (promocion.imagen) {
      // Buscar la imagen en la base de datos
      const imagen = await ImagesOtros.findById(promocion.imagen);
      console.log(imagen);

      if (imagen) {
        // Construir la ruta completa de la imagen en el servidor
        const imagePath = path.join(
          __dirname,
          `../../uploads/imagesOtros/${path.basename(imagen.url)}`
        );

        // Verificar si el archivo existe y eliminarlo del servidor
        if (fs.existsSync(imagePath)) {
          fs.unlinkSync(imagePath);
        }

        console.log("elimnar imagen");

        // Eliminar la imagen de la base de datos
        await ImagesOtros.findByIdAndDelete(promocion.imagen);
      }
    }

    // Eliminar la promoción después de eliminar la imagen asociada
    await Promocion.findByIdAndDelete(id);

    res.json({ message: "Promoción eliminada correctamente" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default deletePromocion;
