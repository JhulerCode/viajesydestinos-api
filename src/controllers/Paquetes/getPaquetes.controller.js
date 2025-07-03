import Paquete from "../../models/PaqueteSchema.js";
import Categoria from "../../models/CategoriaSchema.js";

const getPaquetes = async (req, res, next) => {
  try {
    // Consulta todos los paquetes en la base de datos
    const paquetes = await Paquete.find({ activo: true })
      .populate("categoria")
      .populate("programa");

    res.status(200).json({ paquetes: paquetes }); // Devuelve los paquetes encontrados con sus categorías y menús
  } catch (error) {
    console.error("Error al obtener los paquetes:", error);
    res.status(500).json({ message: "Error al obtener los paquetes" });
  }
};

export default getPaquetes;
