import mongoose from "mongoose";

const UsuarioSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  rol: {
    type: String,
    enum: ['usuario', 'admin', 'superadmin', 'editor'],
    default: 'usuario' // Valor por defecto para el rol
  }
});

const Usuario = mongoose.model("Usuario", UsuarioSchema);

export default Usuario;
