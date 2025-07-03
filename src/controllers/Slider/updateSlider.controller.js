import Slider from "../../models/SliderSchema.js";


const updateSlider = async (req, res) => {
  const { id } = req.params;
  const { titulo, imagen, descripcion, estado , url, paqueteId } = req.body;
  try {
    const existeSlider = await Slider.findById(id);
    if (!existeSlider) {
      return res.status(400).json({ message: "El Slider no existe" });
    }

    // Actualizar los campos de la slider
    existeSlider.titulo = titulo;
    existeSlider.descripcion = descripcion;
    existeSlider.imagen = imagen;
    existeSlider.estado = estado;
    existeSlider.url = url;
    existeSlider.paqueteId = paqueteId;


    // Guardar los cambios en la base de datos
    await existeSlider.save();

    return res.status(200).json({
      slider: existeSlider,
      message: "Slider actualizada con éxito",
    });
  } catch (error) {
    console.error("Error al actualizar el Slider:", error);
    res.status(500).json({ mensaje: "Error al actualizar el Slider" });
  }
};

export default updateSlider;
