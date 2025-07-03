import Promocion from "../../models/PromocionSchema.js";

const createPromocion = async (req, res) => {
  const { titulo, imagen, descripcion } = req.body;
  try {
    // Verificar si ya existe una promoción con el mismo título
    const existePromocion = await Promocion.findOne({ titulo });
    if (existePromocion) {
      return res.status(400).json({ message: "Ya existe una promoción con este título." });
    }

    // Crear un nuevo objeto de promoción con el _id de la imagen
    const nuevaPromocion = new Promocion({
      titulo,
      imagen,  // Aquí debe ser el _id de la imagen, no la URL
      descripcion,
    });

    // Guardar la nueva promoción en la base de datos
    const promocionGuardada = await nuevaPromocion.save();
    const promocionImage  = await Promocion.find(promocionGuardada._id).populate('imagen');

    return res.status(200).json({
      promocion: promocionImage,
      message: "Promoción creada exitosamente.",
    });
  } catch (error) {
    console.error("Error al crear la promoción:", error);
    return res.status(500).json({ mensaje: "Error al crear la promoción." });
  }
};

export default createPromocion;
