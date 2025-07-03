import Venta from "../../models/VentaSchema.js";
import { checkHash, createFormToken } from "../../services/payment.service.js";
import { v4 as uuidv4 } from 'uuid';

export const createPayment = async (req, res) => {
  const {paymentConf, data_paquete_venta} = req.body;
  

  const orderId = `order-${uuidv4()}`;
  const dataPayment = {
    amount: paymentConf.amount,
    currency: "USD",
    customer: {
      reference: "clienteId-12345",
      email: paymentConf.customer.email,
      
    },
    orderId,
  }

  try {
    const response = await createFormToken(dataPayment);
    console.log(response)
    if (response.status !== "SUCCESS") {
      return res.status(400).json(response);
    } else {
      // Agregar el orderId al objeto data_paquete_venta
      data_paquete_venta.orderId = orderId;
      data_paquete_venta.correo = paymentConf.customer.email;


      // Guardar en la base de datos
      const newVenta = new Venta(data_paquete_venta);
      await newVenta.save();

      res.status(200).json(response.answer);
    }
  
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

export const validatePayment = (req, res) => {
  const { clientAnswer, hash, hashKey } = req.body;
  
  if (!checkHash(clientAnswer, hash, hashKey)) return res.status(400).json({ result: "Payment hash mismatch!" });
  res.status(200).json({ result: "Payment Success!" });
};

export const notificationIPN = async (req, res) => {
  const paymentDataIPN = req.body;
  console.log("IPN:", paymentDataIPN);
  /* Retrieve the IPN content */
  const formAnswer = paymentDataIPN["kr-answer"];
  const hash = paymentDataIPN["kr-hash"];
  const hashKey = paymentDataIPN["kr-hash-key"];


const dataParse = JSON.parse(formAnswer)
  /* Check the signature using password */
  if (!checkHash(dataParse, hash, hashKey)) {
    return res.status(400).send("Payment hash mismatch!");
  }

  /* Retrieve the transaction id from the IPN data */
  const transaction = dataParse.transactions[0];

  /* get some parameters from the answer */
  const orderStatus = dataParse.orderStatus;
  const orderId = dataParse.orderDetails.orderId;
  const transactionUUID = transaction.uuid;

  if (orderStatus === "PAID") {
    /* I update my database if needed */
    /* Add here your custom code */
    // Buscar y actualizar el documento en MongoDB
    const venta = await Venta.findOneAndUpdate(
      { orderId: orderId },
      { estado_pago: true },
      { new: true } // Para devolver el documento actualizado
    );

    if (!venta) {
      return res.status(404).send("Venta no encontrada");
    }

    console.log(`Estado de pago actualizado para orderId ${orderId}`);
    console.log(orderStatus)

  }

  /**
   * Message returned to the IPN caller
   * You can return what you want but
   * HTTP response code should be 200
   */
  res.status(200).send(`OK! OrderStatus is ${orderStatus}`);
}

