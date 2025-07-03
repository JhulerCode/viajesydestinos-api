import Paquete from "../../models/PaqueteSchema.js";

const getPaquetesAdmin = async (req, res, next) => {
  try {
    // Consulta todos los paquetes en la base de datos y llena las referencias de 'categoria' y 'programa'
    const paquetes = await Paquete.find().populate("categoria").populate("programa");

    res.status(200).json({ paquetes }); // Devuelve los paquetes encontrados con sus categorías y programas
  } catch (error) {
    console.error("Error al obtener los paquetes:", error);
    res.status(500).json({ message: "Error al obtener los paquetes" });
  }
};

export default getPaquetesAdmin;
