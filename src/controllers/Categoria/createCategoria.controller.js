// Importar el modelo de categoria
import Categoria from "../../models/CategoriaSchema.js";

// Controlador para crear una nueva categoria
const crearCategoria = async (req, res) => {
  const { nombre, imagen, activo, tipo_paquete } = req.body;
  console.log(req.body);

  try {
    // Verificar si el nombre ya está en uso
    const existeCategoria = await Categoria.findOne({ nombre });
    if (existeCategoria) {
      return res.status(400).json({ mensaje: "La categoría ya está en uso" });
    }

    // Crear una nueva categoria
    const nuevaCategoria = new Categoria({
      nombre,

      imagen,
      activo,
      tipo_paquete,
    });

    // Guardar la nueva categoria en la base de datos
    await nuevaCategoria.save();

    // Enviar una respuesta exitosa
    res.status(201).json({
      mensaje: "Categoría creada exitosamente",
      categoria: nuevaCategoria,
    });
  } catch (error) {
    console.error("Error al crear categoría:", error);
    res.status(500).json({ mensaje: "Error al crear categoría" });
  }
};

export default crearCategoria;
