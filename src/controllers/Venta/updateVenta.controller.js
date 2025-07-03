import Venta from "../../models/VentaSchema.js";

const updateVenta = async (req, res) => {
  const { id } = req.params;
  const { estado, fecha_salida, fecha_retorno } = req.body;

  try {
    const existeVenta = await Venta.findById(id);
    if (!existeVenta) {
      return res.status(400).json({ message: "La venta no existe" });
    }

    // Actualizar los campos de la Venta
    existeVenta.estado = estado;
    existeVenta.fecha_salida = fecha_salida;
    existeVenta.fecha_retorno = fecha_retorno;
   


    // Guardar los cambios en la base de datos
    await existeVenta.save();

    return res.status(200).json({
      ventaActualizada: existeVenta,
      message: "Venta actualizada con éxito",
    });
  } catch (error) {
    console.error("Error al actualizar la venta:", error);
    res.status(500).json({ mensaje: "Error al actualizar la venta" });
  }
};

export default updateVenta;
