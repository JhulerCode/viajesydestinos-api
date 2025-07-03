import Categoria from "../../models/CategoriaSchema.js";
import Paquete from "../../models/PaqueteSchema.js";

const getPaquetesCategorias = async (req, res) => {
  try {
    // Obtener todas las categorías
    const categorias = await Categoria.find();
    const paquetes = await Paquete.find();

    // Contar el número de paquetes para cada categoría
    const categoriasConPaquetes = categorias.map((categoria) => {
      const numPaquetes = paquetes.filter(
        (paquete) => paquete.categoria.toString() === categoria._id.toString()
      ).length;
      return { ...categoria.toObject(), numPaquetes };
    });



    // Enviar una respuesta exitosa con las categorías y el número de paquetes
    res.status(200).json({ categorias: categoriasConPaquetes });
  } catch (error) {
    console.error("Error al obtener categorías:", error);
    res.status(500).json({ mensaje: "Error al obtener categorías" });
  }
};

export default getPaquetesCategorias;
