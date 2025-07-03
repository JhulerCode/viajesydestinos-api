import Testimonio from "../../models/TestimonioSchema.js";
import fs from "fs";
import { fileURLToPath } from "url";
import path from "path";
import ImagesOtros from "../../models/ImagesOtrosSchema.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const deleteTestimonio = async (req, res) => {
  try {
    // Extraer el ID del testimonio a eliminar desde los parámetros de la URL
    const { id } = req.params;

    // Buscar el testimonio por su ID
    const testimonio = await Testimonio.findById(id);

    // Verificar si el testimonio existe
    if (!testimonio) {
      return res.status(404).json({ mensaje: "El testimonio no existe" });
    }

    // Verificar si el testimonio tiene una imagen asociada
    if (testimonio.imagen_perfil) {
      // Buscar la imagen en la base de datos
      const imagen = await ImagesOtros.findById(testimonio.imagen_perfil);
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

        console.log("Imagen eliminada");

        // Eliminar la imagen de la base de datos
        await ImagesOtros.findByIdAndDelete(testimonio.imagen);
      }
    }

    // Eliminar el testimonio de la base de datos
    await Testimonio.findByIdAndDelete(id);

    // Enviar una respuesta exitosa
    res.status(200).json({
      mensaje: "Testimonio eliminado exitosamente",
      testimonioEliminado: testimonio,
    });
  } catch (error) {
    console.error("Error al eliminar el testimonio:", error);
    res.status(500).json({ mensaje: "Error al eliminar el testimonio" });
  }
};

export default deleteTestimonio;
