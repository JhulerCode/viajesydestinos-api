import { Router } from "express";


import crearUsuario from "../controllers/Usuarios/createUsuario.controller.js";
import LoginUsuario from "../controllers/Usuarios/loginUsuario.controller.js";
import updateUsuario from "../controllers/Usuarios/updateUsuario.controller.js";
import { authenticateToken, verificarRol } from "../controllers/Autenticacion/AuthToken.controller.js";
import getUsuarios from "../controllers/Usuarios/getUsuarios.controller.js";
import deleteUsuario from "../controllers/Usuarios/deleteUsuario.controller.js";

const routesUsuario = Router();

routesUsuario.post('/login_usuario',LoginUsuario );
routesUsuario.get('/get_usuarios',authenticateToken,verificarRol(['admin','superadmin']),getUsuarios );

routesUsuario.post('/create_usuario',authenticateToken,verificarRol(['admin','superadmin']), crearUsuario);
routesUsuario.put('/update_usuario/:id',authenticateToken,verificarRol(['admin','superadmin']), updateUsuario);
routesUsuario.delete('/delete_usuario/:id',authenticateToken,verificarRol(['admin','superadmin']), deleteUsuario);


export default routesUsuario;