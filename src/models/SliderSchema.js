import mongoose from "mongoose";

const SliderSchema = new mongoose.Schema({
  titulo: { type: String },
  imagen: { type: String, required: true },
  descripcion: { type: String },
  estado: { type: Boolean, default: true },
  url: { type: String },
  paqueteId: { type: String },
});

const Slider = mongoose.model("Slider", SliderSchema);

export default Slider;
