// Modelo de Image
import mongoose from "mongoose";
const ImageSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  url: { type: String, required: true },

  // Otros campos según tus necesidades
});

const Image = mongoose.model("Image", ImageSchema);

export default Image;
