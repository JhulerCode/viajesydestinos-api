import Motor from "../../models/MotorSchema.js";

const createMotor = async (req, res) => {
  const { titulo, imagen, descripcion } = req.body;
  try {
    const existeMotor = await Motor.findOne({ titulo });
    if (existeMotor) {
      return res.status(400).json({ message: "Existe el Motor Fondo" });
    }

 
    // Crear un nuevo usuario con la contraseña encriptada
    const nuevoMotor = new Motor({
        titulo,
        imagen,
        descripcion,
    });

    // Guardar el nuevo Motor en la base de datos
    await nuevoMotor.save();

    return res
      .status(200)
      .json({
        motorFondo: nuevoMotor,
        message: "Motor Fondo creada con exito",
      });
  } catch (error) {
    console.error("Error al crear fondo motor:", error);
    res.status(500).json({ mensaje: "Error al crear fondo motor" });
  }
};

export default createMotor;