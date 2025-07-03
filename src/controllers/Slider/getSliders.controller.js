import Slider from "../../models/SliderSchema.js";


const getSliders = async (req,res) => {

    try {
        // Obtener todas las slider
        const sliders = await Slider.find({estado :true});
        // Enviar una respuesta exitosa con las slider encontradas
        res.status(200).json({ sliders });
      } catch (error) {
        console.error("Error al obtener Sliders:", error);
        res.status(500).json({ mensaje: "Error al obtener Sliders" });
      }
}

export default getSliders;