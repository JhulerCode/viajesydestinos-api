import mongoose from "mongoose";

const CategoriaSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  imagen: { type: String, required: true },
  activo: { type: Boolean, default: true },
  tipo_paquete: {
    type: [
      {
        value: { type: String },
        label: { type: String },
      },
    ],
    required: true,
  },
});

const Categoria = mongoose.model("Categoria", CategoriaSchema);

export default Categoria;
