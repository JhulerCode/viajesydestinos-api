// import mongoose from "mongoose";

// const HabitacionSchema = new mongoose.Schema({
//   tipo: {
//     type: String,
//     enum: ["simple", "doble", "triple"],
//     required: true,
//   },
//   ocupantes: {
//     adultos: { type: Number, default: 0 },
//     ninos: { type: Number, default: 0 },
//   },
// });

// const VentaSchema = new mongoose.Schema({
//   nombre_paquete: {
//     type: String,
//     required: true,
//     trim: true,
//   },
//   nombre_cliente: { type: String, required: true },
//   telefono: { type: String, required: true },
//   correo: { type: String, required: true },

//   fecha_salida: { type: String },
//   fecha_retorno: { type: String },
//   precio_cobrado: { type: String, required: true },
//   cantidad_personas: { type: Number, required: true },
//   tipo_habitaciones: [HabitacionSchema],
//   activo: { type: Boolean, default: true },
//   estado_pago: { type: Boolean, default: false },
//   nombre_hotel: { type: String, required: true },
//   nota_pedido: { type: String },

//   estado: {
//     type: String,
//     enum: ["por atender", "atendido"],
//     default: "por atender",
//   },
//   paquete_id: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "Paquete",
//   },
//   orderId: { type: String, required: true },
// });

// const Venta = mongoose.model("Venta", VentaSchema);

// export default Venta;
import mongoose from "mongoose";
import moment from "moment-timezone";

const obtenerFechaActual = () => {
  return moment().tz("America/Lima").format("DD/MM/YYYY");
};

const obtenerHoraActual = () => {
  return moment().tz("America/Lima").format("HH:mm:ss");
};

const HabitacionSchema = new mongoose.Schema({
  tipo: {
    type: String,
    enum: ["simple", "doble", "triple"],
    required: true,
  },
  ocupantes: {
    adultos: { type: Number, default: 0 },
    ninos: { type: Number, default: 0 },
  },
});

const VentaSchema = new mongoose.Schema({
  nombre_paquete: {
    type: String,
    required: true,
    trim: true,
  },
  nombre_cliente: { type: String, required: true },
  telefono: { type: String, required: true },
  correo: { type: String, required: true },
  fecha_salida: { type: String },
  fecha_retorno: { type: String },
  precio_cobrado: { type: String, required: true },
  cantidad_personas: { type: Number, required: true },
  tipo_habitaciones: [HabitacionSchema],
  activo: { type: Boolean, default: true },
  estado_pago: { type: Boolean, default: false },
  nombre_hotel: { type: String, required: true },
  nota_pedido: { type: String },
  estado: {
    type: String,
    enum: ["por atender", "atendido"],
    default: "por atender",
  },
  paquete_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Paquete",
  },
  orderId: { type: String, required: true },
  fecha_creacion: { type: String, default: obtenerFechaActual },  // Fecha actual de la PC
  hora_creacion: { type: String, default: obtenerHoraActual },    // Hora actual de la PC
});

const Venta = mongoose.model("Venta", VentaSchema);

export default Venta;
