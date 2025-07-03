import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import Programa from '../../models/ProgramaSchema.js';


// Para obtener la ruta del directorio actual en módulos ES
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// URL base del servidor
const SERVER_URL = 'http://localhost:3001'; // Cambia esto a tu dominio o dirección IP

 const deletePrograma = async (req, res) => {
  try {
    const { id } = req.params;

    // Buscar el programa por ID en la base de datos
    const programa = await Programa.findById(id);

    if (!programa) {
      return res.status(404).json({ message: 'Programa no encontrado.' });
    }

    // Obtener la ruta del archivo desde la URL
    const filePath = path.join(__dirname, '../../', 'uploads', 'programas', path.basename(programa.url));

    // Eliminar el archivo del sistema de archivos
    fs.unlink(filePath, async (err) => {
      if (err) {
        return res.status(500).json({ message: 'Error al eliminar el archivo.', error: err });
      }

      // Eliminar el documento de la base de datos
      await Programa.findByIdAndDelete(id);

      res.status(200).json({ message: 'Programa eliminado correctamente.' });
    });
  } catch (error) {
    res.status(500).json({ message: 'Ocurrió un error.', error });
  }
};


export default deletePrograma;