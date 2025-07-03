import Categoria from "../../models/CategoriaSchema.js";

const deleteCategoria = async (req, res) => {
  try {
    // Extraer el ID de la categoría a eliminar desde los parámetros de la URL
    const { id } = req.params;

    // Buscar la categoría por su ID
    const categoria = await Categoria.findById(id);

    // Verificar si la categoría existe
    if (!categoria) {
      return res.status(404).json({ mensaje: "La categoría no existe" });
    }

    // Eliminar la categoría de la base de datos
    await categoria.deleteOne();

    // Enviar una respuesta exitosa
    res.status(200).json({
      mensaje: "Categoría eliminada exitosamente",
      categoriaEliminada: categoria,
    });
  } catch (error) {
    console.error("Error al eliminar la categoría:", error);
    res.status(500).json({ mensaje: "Error al eliminar la categoría" });
  }
};

export default deleteCategoria;
