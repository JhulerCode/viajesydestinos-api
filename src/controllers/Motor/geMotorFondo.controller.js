import Motor from "../../models/MotorSchema.js";

const getMotor = async (req, res) => {
  try {
    // Obtener todas las Motor
    const motor = await Motor.find();

    // Enviar una respuesta exitosa con las Motor encontradas
    res.status(200).json({ motor });
  } catch (error) {
    console.error("Error al obtener Motor fondo:", error);
    res.status(500).json({ mensaje: "Error al obtener Motor fondo" });
  }
};

export default getMotor;
