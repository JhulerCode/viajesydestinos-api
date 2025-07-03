import axios from "axios";
import { getConfig } from "../config.js";
import Hex from 'crypto-js/enc-hex.js';
import hmacSHA256 from 'crypto-js/hmac-sha256.js';

const { ID_TIENDA, PASSWORD, CLAVE_HMAC_SHA_256 } = getConfig();
export const createFormToken = async (paymentConf) => {
    const createPaymentEndPoint = `https://${ID_TIENDA}:${PASSWORD}@api.micuentaweb.pe/api-payment/V4/Charge/CreatePayment`
    try {
        const response = await axios.post(createPaymentEndPoint, paymentConf, {
            headers: { 'Content-Type': 'application/json' }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const checkHash = (answer, hash, hashKey) => {
    
    let key = '';
    if (hashKey === "sha256_hmac") {
        key = CLAVE_HMAC_SHA_256;
    } else if (hashKey === "password") {
        key = PASSWORD;
    }
    const answerHash = Hex.stringify(hmacSHA256(JSON.stringify(answer), key));
    return hash === answerHash;
};