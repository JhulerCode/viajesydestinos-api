import Image from "../../models/ImageSchema.js";

const getImages = async (req, res) => {
  try {
    // Obtener todas las categorías
    const Images = await Image.find();
    // Enviar una respuesta exitosa con las categorías encontradas
    res.status(200).json({ Images });
  } catch (error) {
    console.error("Error al obtener categorías:", error);
    res.status(500).json({ mensaje: "Error al obtener categorías" });
  }
};

export default getImages;
