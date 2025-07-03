import Paquete from "../../models/PaqueteSchema.js";

const toggleActivo = async (req, res) => {
  try {
    const paquete = await Paquete.findById(req.params.id);

    if (!paquete) {
      return res.status(404).json({ message: "Paquete no encontrado" });
    }

    paquete.activo = !paquete.activo;
    await paquete.save();
    const paqueteUpdate = await Paquete.find(paquete._id).populate("categoria");

    res.status(200).json({ paquete: paqueteUpdate[0] });
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar el paquete" });
  }
};

export default toggleActivo;
