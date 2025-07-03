// import Paquete from "../../models/PaqueteSchema.js";

// const deletePaquete = async (req, res, next) => {
//   const { id } = req.params;
//   try {
//     // Utiliza el método findByIdAndDelete sin un objeto para buscar por ID directamente
//     const deletedPaquete = await Paquete.findByIdAndDelete(id);

//     if (!deletedPaquete) {
//       // Si no se encuentra el paquete, devuelve un mensaje de error
//       return res.status(404).json({ message: "Paquete no encontrado" });
//     }
//     const idDelete = await deletedPaquete._id;
//     // Devuelve el paquete eliminado en la respuesta
//     res.status(200).json({idDelete});
//   } catch (error) {
//     console.error("Error al eliminar paquete:", error);
//     res.status(500).json({ message: "Error al eliminar paquete" });
//   }
// };

// export default deletePaquete;

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import Paquete from '../../models/PaqueteSchema.js';
import Programa from '../../models/ProgramaSchema.js';

// Para obtener la ruta del directorio actual en módulos ES
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const deletePaquete = async (req, res, next) => {
  const { id } = req.params;

  try {
    // Encuentra y elimina el paquete por ID
    const deletedPaquete = await Paquete.findByIdAndDelete(id);

    if (!deletedPaquete) {
      return res.status(404).json({ message: 'Paquete no encontrado' });
    }

    // Verifica si el programa está presente
    if (deletedPaquete.programa) {
      // Busca el programa asociado
      const programa = await Programa.findById(deletedPaquete.programa);

      if (programa) {
        // Extrae el nombre del archivo PDF del campo programa
        const programaUrl = programa.url;
        const fileName = programaUrl.split('/').pop(); // Obtiene el nombre del archivo

        const filePath = path.join(__dirname, '../../', 'uploads', 'programas', fileName);

        // Elimina el archivo del sistema de archivos
        fs.unlink(filePath, async (err) => {
          if (err) {
            console.error('Error al eliminar el archivo del programa:', err);
            return res.status(500).json({
              message: 'Paquete eliminado, pero hubo un error al eliminar el archivo del programa',
            });
          }

          console.log('Archivo del programa eliminado correctamente');

          // Elimina el documento del programa de la base de datos
          await Programa.findByIdAndDelete(programa._id);
        });
      } else {
        console.warn('Programa asociado no encontrado, omitiendo eliminación del programa');
      }
    }

    // Devuelve el paquete eliminado en la respuesta
    res.status(200).json({ idDelete: deletedPaquete._id });
  } catch (error) {
    console.error('Error al eliminar paquete:', error);
    res.status(500).json({ message: 'Error al eliminar paquete' });
  }
};

export default deletePaquete;
