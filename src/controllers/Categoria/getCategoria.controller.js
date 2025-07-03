import Categoria from "../../models/CategoriaSchema.js";

const getCategorias = async (req, res) => {
  try {
    // Obtener todas las categorías
    const categorias = await Categoria.find();
    // Enviar una respuesta exitosa con las categorías encontradas
    res.status(200).json({ categorias });
  } catch (error) {
    console.error("Error al obtener categorías:", error);
    res.status(500).json({ mensaje: "Error al obtener categorías" });
  }
};

export default getCategorias;
