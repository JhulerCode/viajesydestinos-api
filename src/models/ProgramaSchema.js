// Modelo de Carrito
import mongoose from "mongoose";
const ProgramaSchema = new mongoose.Schema({
  nombre: { type: String },
  url: { type: String, required: true },

  // Otros campos según tus necesidades
});

const Programa = mongoose.model("Programa", ProgramaSchema);

export default Programa;
