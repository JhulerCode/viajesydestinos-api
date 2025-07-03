// Modelo de Image
import mongoose from "mongoose";
const ImagesOtrosSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  url: { type: String, required: true },

  // Otros campos según tus necesidades
});

const ImagesOtros = mongoose.model("ImagesOtros", ImagesOtrosSchema);

export default ImagesOtros;
