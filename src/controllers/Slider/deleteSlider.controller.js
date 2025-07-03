import Slider from "../../models/SliderSchema.js";

const deleteSlider = async (req, res) => {
    const { id } = req.params;
    try {
        await Slider.findByIdAndDelete(id);
        res.json({id, message: "Slider eliminado correctamente" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export  default deleteSlider ;