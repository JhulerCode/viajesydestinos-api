// Importa bcrypt para encriptar contraseñas
import bcrypt from "bcrypt";
import Usuario from "../../models/UsuarioSchema.js";

// Controlador para actualizar un usuario
const updateUsuario = async (req, res) => {
  const { id } = req.params;
  const { name, email, password, rol } = req.body;

  try {
    // Buscar el usuario por su ID
    const usuario = await Usuario.findById(id);

    // Verificar si el usuario existe
    if (!usuario) {
      return res.status(404).json({ mensaje: "Usuario no encontrado" });
    }

    // Encriptar la nueva contraseña si se proporciona
    let hashedPassword;
    if (password) {
      hashedPassword = await bcrypt.hash(password, 10);
    }

    // Actualizar los campos del usuario con los nuevos valores
    usuario.name = name || usuario.name;
    usuario.email = email || usuario.email;
    usuario.password = hashedPassword || usuario.password; // Si no se proporciona una nueva contraseña, se mantiene la anterior
    usuario.rol = rol || usuario.rol;

    // Guardar los cambios en la base de datos
    await usuario.save();

    // Enviar una respuesta exitosa
    res.status(200).json({ mensaje: "Usuario actualizado exitosamente", usuario });
  } catch (error) {
    console.error("Error al actualizar usuario:", error);
    res.status(500).json({ mensaje: "Error al actualizar usuario" });
  }
};

export default updateUsuario;
