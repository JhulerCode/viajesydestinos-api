import mongoose from "mongoose";

const PromocionSchema = new mongoose.Schema({
  titulo: { type: String, required: true },
  imagen: { type: mongoose.Schema.Types.ObjectId, ref: "ImagesOtros" },
  descripcion: { type: String },
  estado: { type: Boolean, default: true },
});

const Promocion = mongoose.model("Promocion", PromocionSchema);

export default Promocion;
