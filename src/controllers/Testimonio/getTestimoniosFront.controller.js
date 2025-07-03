import Testimonio from "../../models/TestimonioSchema.js";

const getTestimoniosFront = async (req, res) => {
    try {
      // Obtener todas lasTestimonios
      const testimonios = await Testimonio.find({estado:true}).populate('imagen_perfil');
      // Enviar una respuesta exitosa con lasTestimonios encontradas
      res.status(200).json({ testimonios });
    } catch (error) {
      console.error("Error al obtener Testimonios:", error);
      res.status(500).json({ mensaje: "Error al obtener Testimonios" });
    }
  };
  
  export default getTestimoniosFront;
  