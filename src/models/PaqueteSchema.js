import mongoose from "mongoose";

const serviciosSchema = {
  type: Boolean,
  default: false,
};

const PaqueteSchema = new mongoose.Schema({
  categoria: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Categoria",
  },

  tipo_paquete: {
    type: String,
    required: true,
  },
  nombre: {
    type: String,
    required: true,
  },
  ubicacion: {
    continente: {
      type: String,
    },
    pais: {
      type: String,
      required: true,
    },
    ciudad: {
      type: String,
      required: true,
    },
  },

  descuento: {
    type: Number,
    default: 0,
    min: 0,
  },
  destacado: {
    type: Boolean,
    default: false,
  },
  oferta: {
    type: Boolean,
    default: false,
  },

  imagen_principal: {
    type: String,
    required: true,
  },
  imagenes: [
    {
      type: String,
      required: true,
    },
  ],
  programa: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Programa",
  },
  tiempo: {
    dia: {
      type: Number,
      required: true,
      min: 0,
    },
    noche: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  fecha_salida: {
    type: String,
  },
  fecha_retorno: {
    type: String,
  },
  descripcion: {
    type: String,
    required: true,
  },
  activo: {
    type: Boolean,
    default: true,
  },
  compra: {
    type: Boolean,
    default: true,
  },
  servicios: {
    vuelo: serviciosSchema,
    alojamiento: serviciosSchema,
    desayuno: serviciosSchema,
    traslado: serviciosSchema,
    asistencia: serviciosSchema,
    todo: serviciosSchema,
  },
  incluye: [
    {
      type: String,
    },
  ],
  no_incluye: [
    {
      type: String,
    },
  ],
  condiciones: [
    {
      type: String,
    },
  ],
  tarifas: [{
    aerolinea: {
      type: String,
    },
    fecha: {
      type: String,
    },
    ruta: {
      type: String,
    },
    salida: {
      type: String,
    },
    llegada: {
      type: String,
    },
  }],
  hoteles: [
    {
      nombre: {
        type: String,
      },
      categoria_hotel: {
        type: String,
      },

      simple: {
        type: Number,
      },
      doble: {
        type: Number,
      },
      triple: {
        type: Number,
      },
      precio_nino: {
        type: Number,
      },
      descripcion: {
        type: String,
      },
    },
  ],
  itinerarios: [
    {
      titulo_ite: {
        type: String,
        trim: true,
      },
      descripcion_ite: {
        type: String,
        trim: true,
      },
    },
  ],
});

const Paquete = mongoose.model("Paquete", PaqueteSchema);

export default Paquete;
