import mongoose from "mongoose";

const TestimonioSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    trim: true,
  },
  imagen_perfil: { type: mongoose.Schema.Types.ObjectId, ref: "ImagesOtros" },
  puntuacion: {
    type: String,
    required: true,
    min: 0,
    max: 5,
  },

  pais: { type: String, required: true },
  estado: { type: Boolean, default: true },
  descripcion: { type: String, required: true },
});

const Testimonio = mongoose.model("Testimonio", TestimonioSchema);

export default Testimonio;
