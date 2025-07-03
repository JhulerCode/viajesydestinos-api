// Modelo de Carrito
import mongoose from "mongoose";
const CarritoSchema = new mongoose.Schema({
  usuario: { type: mongoose.Schema.Types.ObjectId, ref: "Usuario" },
  paquete: { type: mongoose.Schema.Types.ObjectId, ref: "Paquete" },
  cantidad: Number,
  totalPrecio: Number,
  // Otros campos según tus necesidades
});

const Carrito = mongoose.model("Carrito", CarritoSchema);

export default Carrito;
