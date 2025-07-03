import Promocion from "../../models/PromocionSchema.js";

const getPromociones = async (req, res) => {
    try {
        // Obtener todas las promociones y poblar los datos de la imagen
        const promocion = await Promocion.find().populate('imagen');
        // console.log(promocion);
        // Enviar una respuesta exitosa con las promociones encontradas
        res.status(200).json({ promocion });
    } catch (error) {
        console.error("Error al obtener promociones:", error);
        res.status(500).json({ mensaje: "Error al obtener promociones" });
    }
};

export default getPromociones;
