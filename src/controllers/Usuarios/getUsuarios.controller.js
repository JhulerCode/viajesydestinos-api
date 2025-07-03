import Usuario from "../../models/UsuarioSchema.js";


// Controlador para obtener todos los usuarios
const getUsuarios = async (req, res) => {
  try {
    // Obtener todos los usuarios excepto el rol 'superadmin'
    const usuarios = await Usuario.find({ rol: { $ne: 'superadmin' } }).select('-password');

    // Enviar una respuesta exitosa con los usuarios obtenidos
    res.status(200).json({ usuarios });
  } catch (error) {
    console.error("Error al obtener usuarios:", error);
    res.status(500).json({ mensaje: "Error al obtener usuarios" });
  }
};

export default getUsuarios;
