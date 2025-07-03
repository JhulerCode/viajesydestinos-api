import mongoose from "mongoose";

const MotorSchema = new mongoose.Schema({
  
  titulo: { type: String, required: true },
  imagen:{ type:String, required: true },
  descripcion: { type: String },
  estado: {type:Boolean,default:true}
});

const Motor = mongoose.model("Motor", MotorSchema);

export default Motor;
