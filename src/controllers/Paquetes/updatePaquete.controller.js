import Categoria from "../../models/CategoriaSchema.js";

import Paquete from "../../models/PaqueteSchema.js";

const updatePaquete = async (req, res) => {
  const { id } = req.params;
  try {
    const {
      categoria,
      ubicacion,
      nombre,
      descuento,
      destacado,
      oferta,
      fecha_salida,
      fecha_retorno,
      puntuacion,
      tipo_paquete,
      imagen_principal,
      imagenes,
      tiempo,
      descripcion,
      salidaConfirmada,
      activo,
      compra,
      tarifas,
      servicios,
      hoteles,
      incluye,
      no_incluye,
      condiciones,
      programa,
      itinerarios,
    } = req.body;

    console.log(req.body);

   
    // Verificar si las categorías existen
    const categoriaExistente = await Categoria.find({
      _id: { $in: categoria },
    });
    if(!categoriaExistente) {
      return res.status(400).json({ mensaje: "El categoria no existe" });
    }
   
   
    // Buscar el paquete a actualizar por su ID
    const paqueteExistente = await Paquete.findById(id);
    if (!paqueteExistente) {
      return res.status(404).json({ mensaje: "El paquete no existe" });
    }

    // Actualizar los campos del paquete con los nuevos valores
    paqueteExistente.categoria = categoria;
    paqueteExistente.ubicacion = ubicacion;
    paqueteExistente.nombre = nombre;
    paqueteExistente.descuento = descuento;
    paqueteExistente.destacado = destacado;
    paqueteExistente.oferta = oferta;
    paqueteExistente.fecha_salida=fecha_salida,
    paqueteExistente.fecha_retorno=fecha_retorno,
    paqueteExistente.puntuacion = puntuacion;
    paqueteExistente.imagen_principal = imagen_principal;
    paqueteExistente.imagenes = imagenes;
  

    paqueteExistente.tiempo = tiempo;
    paqueteExistente.descripcion = descripcion;
    paqueteExistente.salidaConfirmada = salidaConfirmada;
    paqueteExistente.servicios = servicios;
    paqueteExistente.activo = activo;
    paqueteExistente.incluye = incluye;
    paqueteExistente.no_incluye = no_incluye;
    paqueteExistente.tarifas = tarifas;
    paqueteExistente.hoteles = hoteles;
    paqueteExistente.condiciones = condiciones;
    paqueteExistente.programa = programa;
    paqueteExistente.tipo_paquete = tipo_paquete;
    paqueteExistente.compra = compra;
    paqueteExistente.itinerarios = itinerarios;




    // Guardar los cambios realizados en el paquete
    const paqueteActualizado = await paqueteExistente.save();

    // Obtener las categorías 
 
  
    const paqueteUpdated = await Paquete.find(paqueteActualizado._id).populate("categoria").populate("programa");

    res.status(200).json({
      paqueteActualizado: paqueteUpdated,
      message: "Actualizado correctamente",
    });
  } catch (error) {
    console.error("Error al actualizar el paquete:", error);
    res.status(500).json({ mensaje: "Error interno del servidor" });
  }
};

export default updatePaquete;
