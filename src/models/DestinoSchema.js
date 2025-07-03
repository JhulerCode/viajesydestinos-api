import mongoose from "mongoose";

const DestinoSchema = new mongoose.Schema({
  nombre: { type: String, unique: true, required: true },
  descripcion: { type: String, required: true },
  imagenes: [{ type: String, required: true }],
  ubicacion: { type: String, required: true },
  precio_promedio: { type: Number, required: true },
  servicios: [{ type: String }],
  puntuacion: { type: Number, default: 0 },
  // Otros campos según tus necesidades
});

const Destino = mongoose.model("Destino", DestinoSchema);

export default Destino;
