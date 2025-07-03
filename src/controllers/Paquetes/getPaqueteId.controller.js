import Paquete from "../../models/PaqueteSchema.js";


const getPaqueteId = async (req, res, next) => {
  const { id } = req.params;

  try {
    // Busca el paquete por ID y utiliza `populate` para traer la categoría relacionada
    const paquete = await Paquete.findById(id).populate('categoria');

    if (!paquete) {
      return res.status(404).json({ message: "Paquete no encontrado" });
    }

    res.status(200).json({ paquete });
  } catch (error) {
    console.error("Error al obtener el paquete:", error);
    res.status(500).json({ message: "Error al obtener el paquete" });
  }
};

export default getPaqueteId;
