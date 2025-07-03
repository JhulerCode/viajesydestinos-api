// Importa bcrypt para encriptar y comparar contraseñas
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { SECRET } from "../../config.js";
// Importa el modelo de usuario
import Usuario from "../../models/UsuarioSchema.js";

// Controlador para el inicio de sesión de usuarios
const LoginUsuario = async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);
    console.log(email, password);
  try {
    // Buscar el usuario por su email
    const usuario = await Usuario.findOne({ email });

    // Verificar si el usuario existe
    if (!usuario) {
      return res.status(404).json({ mensaje: "Usuario no encontrado" });
    }

    // Verificar si la contraseña es correcta utilizando bcrypt
    const passwordMatch = await bcrypt.compare(password, usuario.password);
    if (!passwordMatch) {
      return res.status(401).json({ mensaje: "Contraseña incorrecta" });
    }

    // Si el usuario y la contraseña son válidos, generar el token JWT
    const token = jwt.sign(
      { id: usuario._id, email: usuario.email, rol: usuario.rol },
      SECRET,
      // { expiresIn: "1h" }
    );
    // Si el usuario y la contraseña son correctos, enviar una respuesta exitosa
    res.status(200).json({ mensaje: "Inicio de sesión exitoso", usuario , token});
  } catch (error) {
    console.error("Error en inicio de sesión:", error);
    res.status(500).json({ mensaje: "Error en inicio de sesión" });
  }
};

export default LoginUsuario;
