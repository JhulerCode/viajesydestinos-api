import Categoria from "../../models/CategoriaSchema.js";

import Paquete from "../../models/PaqueteSchema.js";

// Controlador para crear un nuevo paquete
const crearPaquete = async (req, res) => {
  console.log(req.body);
  try {
    const {
      categoria,
      destacado,
      oferta,
      descuento,
      ubicacion,
      fecha_salida,
      fecha_retorno,
      nombre,
      tipo_paquete,
      imagen_principal,
      imagenes,
      tiempo,
      descripcion,
      servicios,
      incluye,
      no_incluye,
      tarifas,
      hoteles,
      condiciones,
      programa,
      itinerarios
    } = req.body;

    // Verificar si las categorías existen
    const categoriaExistente = await Categoria.find({
      _id: { $in: categoria },
    });
    if(!categoriaExistente) {
      return res.status(400).json({ mensaje: "El categoria no existe" });
    }
   
   

    // Verificar si el paquete ya existe
    const paqueteExistente = await Paquete.findOne({ nombre });
    if (paqueteExistente) {
      return res.status(400).json({ mensaje: "El paquete ya existe" });
    }

     // Verificar si programa es una cadena vacía
     const programaValido = programa && programa !== "" ? programa : null;

    // Crear el nuevo paquete con los datos proporcionados
    const nuevoPaquete = new Paquete({
      categoria,
      destacado,
      oferta,
      ubicacion,
      nombre,
      descuento,
      fecha_salida,
      fecha_retorno,
      tipo_paquete,
      imagen_principal,
      imagenes,
      tiempo,
      descripcion,
      incluye,
      no_incluye,
      tarifas,
      hoteles,
      servicios,
      condiciones,
      programa: programaValido,
      itinerarios,
    });

    // Guardar el nuevo paquete en la base de datos
    const paqueteGuardado = await nuevoPaquete.save();
    const paqueteCompleto = await Paquete.find(paqueteGuardado._id).populate("categoria").populate("programa")

    res.status(201).json({ paqueteCompleto });
  } catch (error) {
    console.error("Error al crear el paquete:", error);
    res.status(500).json({ mensaje: "Error interno del servidor" });
  }
};

export default crearPaquete;
