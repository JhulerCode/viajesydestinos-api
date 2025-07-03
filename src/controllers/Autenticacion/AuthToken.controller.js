import jwt from "jsonwebtoken";
import { SECRET } from "../../config.js";
const authenticateToken = (req, res, next) => {
    // Obtener el encabezado de autorización
    const authHeader = req.headers["authorization"];

    // Verificar si se proporcionó un token
    if (!authHeader) {
      return res.status(401).json({ message: "Token de autorización no proporcionado" });
    }
  
    // Separar el encabezado en dos partes: Bearer y el token
    const [bearer, token] = authHeader.split(" ");
  
    // Verificar si el formato del encabezado es correcto
    if (bearer !== "Bearer" || !token) {
      return res.status(401).json({ message: "Formato de encabezado de autorización inválido" });
    }
  
    console.log(token)
    // Verificar el token
    jwt.verify(token, SECRET, (err, decodedToken) => {
      if (err) {
        return res.status(403).json({ message: "Token no válido" });
      }
      
      // Guardar la información del usuario decodificada en el objeto de solicitud para su uso posterior
      req.user = decodedToken;
      next();
    });
  }
  

const verificarRol = (rolesPermitidos) => {
    console.log(rolesPermitidos)
  return (req, res, next) => {
    const { rol } = req.user;

    // Verificar si el rol del usuario está permitido
    if (!rolesPermitidos.includes(rol)) {
      return res.status(403).json({ message: 'Acceso denegado. Rol no autorizado' });
    }

    // Si el rol del usuario está permitido, continuar con la siguiente función de middleware
    next();
  };
};

export { authenticateToken, verificarRol };
