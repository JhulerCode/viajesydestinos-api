import Motor from "../../models/MotorSchema.js";

const updateMotor = async (req, res) => {
  const { id } = req.params;
  const { titulo, imagen, descripcion, estado } = req.body;
  try {
    const existeMotor = await Motor.findById(id);
    if (!existeMotor) {
      return res.status(400).json({ message: "El fondo motor no existe" });
    }

    // Actualizar los campos del fondo motor
    existeMotor.titulo = titulo;
    existeMotor.descripcion = descripcion;
    existeMotor.imagen = imagen;
    existeMotor.estado = estado;

    // Guardar los cambios en la base de datos
    await existeMotor.save();

    return res.status(200).json({
      motorFondo: existeMotor,
      message: "Fondo motor actualizada con éxito",
    });
  } catch (error) {
    console.error("Error al actualizar el Fondo motor:", error);
    res.status(500).json({ mensaje: "Error al actualizar el Fondo motor" });
  }
};

export default updateMotor;
