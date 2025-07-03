import Destino from "../../models/DestinoSchema.js";

const createDestino = async (req, res, next) => {
  try {
    // Obtener los datos del destino del cuerpo de la solicitud
    const { nombre, descripcion, imagenes, ubicacion, precio_promedio, servicios, puntuacion } = req.body;

    // Verificar si ya existe un destino con el mismo nombre
    const destinoExistente = await Destino.findOne({ nombre });

    // Si ya existe un destino con el mismo nombre, enviar un error
    if (destinoExistente) {
      return res.status(400).json({ error: 'Ya existe un destino con el mismo nombre' });
    }

    // Crear una instancia del modelo de Destino con los datos proporcionados
    const nuevoDestino = new Destino({
      nombre,
      descripcion,
      imagenes,
      ubicacion,
      precio_promedio,
      servicios,
      puntuacion
    });

    // Guardar el nuevo destino en la base de datos
    const destinoGuardado = await nuevoDestino.save();

    // Enviar una respuesta de éxito con el destino creado
    res.status(201).json({
      message: 'Destino creado exitosamente',
      destino: destinoGuardado
    });
  } catch (error) {
    // Manejar errores
    console.error('Error al crear destino:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

export default createDestino;
