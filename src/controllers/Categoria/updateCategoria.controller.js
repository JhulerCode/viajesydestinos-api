// Importar el modelo de categoría
import Categoria from "../../models/CategoriaSchema.js";

// Controlador para actualizar una categoría
const actualizarCategoria = async (req, res) => {
  const { id } = req.params;
  const { nombre, imagen, tipo_paquete, activo } = req.body;
  console.log(req.body);

  try {
    // Buscar la categoría por su ID
    const categoria = await Categoria.findById(id);
    if (!categoria) {
      return res.status(404).json({ mensaje: "La categoría no existe" });
    }

    // Actualizar los campos de la categoría
    categoria.nombre = nombre;

    categoria.imagen = imagen;
    categoria.activo = activo;
    categoria.tipo_paquete = tipo_paquete;

    // Guardar los cambios en la base de datos
    await categoria.save();

    // Enviar una respuesta exitosa
    res.status(200).json({
      mensaje: "Categoría actualizada exitosamente",
      categoria: categoria,
    });
  } catch (error) {
    console.error("Error al actualizar categoría:", error);
    res.status(500).json({ mensaje: "Error al actualizar categoría" });
  }
};

export default actualizarCategoria;
