import Promocion from "../../models/PromocionSchema.js";

const updatePromocion = async (req, res) => {
  const { id } = req.params;
  const { titulo, imagen, descripcion, estado } = req.body;
  try {
    const existePromocion = await Promocion.findById(id);
    if (!existePromocion) {
      return res.status(400).json({ message: "La promoción no existe" });
    }

    // Actualizar los campos de la promoción
    existePromocion.titulo = titulo;
    existePromocion.descripcion = descripcion;
    existePromocion.imagen = imagen;
    existePromocion.estado = estado;

    // Guardar los cambios en la base de datos
    await existePromocion.save();
    const promocionImagen = await Promocion.find(existePromocion._id).populate('imagen')

    

    return res.status(200).json({
      promocion: promocionImagen,
      message: "Promoción actualizada con éxito",
    });
  } catch (error) {
    console.error("Error al actualizar la promoción:", error);
    res.status(500).json({ mensaje: "Error al actualizar la promoción" });
  }
};

export default updatePromocion;
