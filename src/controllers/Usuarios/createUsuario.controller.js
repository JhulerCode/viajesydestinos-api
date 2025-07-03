// Importar el modelo de usuario

// Importar bcrypt para encriptar contraseñas
import bcrypt from "bcrypt";
import Usuario from "../../models/UsuarioSchema.js";

// Controlador para crear un nuevo usuario
const crearUsuario = async (req, res) => {
  const { name, email, password, rol } = req.body;

  try {
    // Verificar si el email ya está en uso
    const existeUsuario = await Usuario.findOne({ email });
    if (existeUsuario) {
      return res.status(400).json({ mensaje: "El email ya está en uso" });
    }

    // Encriptar la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear un nuevo usuario con la contraseña encriptada
    const nuevoUsuario = new Usuario({
      name,
      email,
      password: hashedPassword, // Utilizamos la contraseña encriptada
      rol
    });

    // Guardar el nuevo usuario en la base de datos
    await nuevoUsuario.save();

    // Enviar una respuesta exitosa
    res.status(201).json({ mensaje: "Usuario creado exitosamente", usuario: nuevoUsuario });
  } catch (error) {
    console.error("Error al crear usuario:", error);
    res.status(500).json({ mensaje: "Error al crear usuario" });
  }
};

export default crearUsuario;
