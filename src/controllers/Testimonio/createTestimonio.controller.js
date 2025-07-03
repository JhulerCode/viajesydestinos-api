import Testimonio from "../../models/TestimonioSchema.js";

// Crear un nuevo menú
const createTestimonio = async (req, res) => {
  const { nombre,imagen_perfil, estado, descripcion, puntuacion , pais } = req.body;

  try {
    const nuevoTestimonio = new Testimonio({nombre,imagen_perfil, estado, descripcion, puntuacion , pais });
    const TestimonioCreado = await nuevoTestimonio.save();
    const testimonioImage  = await Testimonio.find(TestimonioCreado._id).populate('imagen_perfil');

    res.status(201).json({ message:`Testimonio ${TestimonioCreado.nombre} creado exitosamente`, testimonio:testimonioImage });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export default createTestimonio;
