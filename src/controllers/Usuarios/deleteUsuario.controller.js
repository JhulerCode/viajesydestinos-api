import Usuario from "../../models/UsuarioSchema.js";

// Eliminar un menú existente
 const deleteUsuario = async (req, res) => {
    const { id } = req.params;
  
    try {
      await Usuario.findByIdAndDelete(id);
      res.json({usuarioId:id, message: 'usuario eliminado exitosamente' });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };

  export default deleteUsuario;