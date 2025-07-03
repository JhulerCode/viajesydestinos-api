import Slider from "../../models/SliderSchema.js";

const createSlider = async (req, res) => {
  const { titulo, imagen, descripcion, url, paqueteId } = req.body;

  try {
    const existeSlider = await Slider.findOne({ titulo });
    if (existeSlider) {
      return res.status(400).json({ message: "Existe el Slider" });
    }

    // Crear un nuevo usuario con la contraseña encriptada
    const nuevoSlider = new Slider({
      titulo,
      imagen,
      descripcion,
      url,
      paqueteId,
    });

    // Guardar el nuevo Slider en la base de datos
    await nuevoSlider.save();

    return res.status(200).json({
      slider: nuevoSlider,
      message: "Slider creado con exito",
    });
  } catch (error) {
    console.error("Error al crear slider:", error);
    res.status(500).json({ mensaje: "Error al crear slider" });
  }
};

export default createSlider;
