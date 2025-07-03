import Testimonio from "../../models/TestimonioSchema.js";

const updateTestimonio = async (req, res) => {
    const { id } = req.params;
    const {  nombre,imagen_perfil, estado, descripcion, puntuacion , pais } = req.body;
  
    try {
      // Buscar la Testimonio por su ID
      const testimonio = await Testimonio.findById(id);
      if (!testimonio) {
        return res.status(404).json({ mensaje: "El testimonio no existe" });
      }
  
      // Actualizar los campos de la Testimonio
      testimonio.nombre = nombre;
      testimonio.descripcion = descripcion;
      testimonio.imagen_perfil = imagen_perfil;
      testimonio.estado = estado;
      testimonio.puntuacion = puntuacion;
      testimonio.pais = pais;




  
      // Guardar los cambios en la base de datos
      await testimonio.save();
      const testimonioImagen = await Testimonio.find(testimonio._id).populate('imagen_perfil');
  
      // Enviar una respuesta exitosa
      res.status(200).json({
        mensaje: "Testimonio actualizada exitosamente",
        testimonio: testimonioImagen,
      });
    } catch (error) {
      console.error("Error al actualizar Testimonio:", error);
      res.status(500).json({ mensaje: "Error al actualizar Testimonio" });
    }
  };
  
  export default updateTestimonio;