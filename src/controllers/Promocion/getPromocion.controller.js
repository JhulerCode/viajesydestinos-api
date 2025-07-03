import Promocion from "../../models/PromocionSchema.js";

const getPromocion = async (req,res) => {

    try {
        // Obtener todas las promocion
        const promocion = await Promocion.find({estado:true}).populate('imagen');
        // Enviar una respuesta exitosa con las promocion encontradas
        res.status(200).json({ promocion });
      } catch (error) {
        console.error("Error al obtener promocion:", error);
        res.status(500).json({ mensaje: "Error al obtener promocion" });
      }
}

export default getPromocion;