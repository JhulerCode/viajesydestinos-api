import Venta from "../../models/VentaSchema.js";
import Paquete from "../../models/PaqueteSchema.js"; // Importa el modelo de Paquete

// Controlador para obtener todos los ventas
const getVentas = async (req, res) => {
  try {
    // Obtener todos los Ventas y popular el paquete relacionado
    const Ventas = await Venta.find().populate('paquete_id');

    // Enviar una respuesta exitosa con los Ventas obtenidos
    res.status(200).json({ Ventas });
  } catch (error) {
    console.error("Error al obtener Ventas:", error);
    res.status(500).json({ mensaje: "Error al obtener Ventas" });
  }
};

export default getVentas;
