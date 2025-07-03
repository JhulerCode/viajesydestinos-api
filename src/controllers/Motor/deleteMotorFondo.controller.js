import Motor from "../../models/MotorSchema.js";

const deleteMotor = async (req, res) => {
    const { id } = req.params;
    try {
        await Motor.findByIdAndDelete(id);
        res.json({ message: "Motor Fondo eliminada correctamente" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export  default deleteMotor ;