import { config as dotenvConfig } from 'dotenv';

dotenvConfig();

export const SECRET = process.env.SECRET;
export const HOST_FRONT = "http://localhost:5173";
export const HOST = "http://localhost:3001/api";
export const PORT = process.env.PORT || 3000;
export const MONGODB_URI = process.env.MONGODB_URI;
export const MONGODB_URI2 = process.env.MONGODB_URI2;


export const getConfig = () => {
  const MODE = process.env.MODE !== 'PROD' ;
  return {
    MODE: process.env.MODE,
    ID_TIENDA: process.env.ID_TIENDA,
    CLAVE: MODE ? process.env.CLAVE_TEST : process.env.CLAVE_PRODUCCION,
    PASSWORD: MODE ? process.env.PASSWORD_TEST : process.env.PASSWORD_PRODUCCION,
    PUBLIC_KEY: MODE ? process.env.PUBLIC_KEY_TEST : process.env.PUBLIC_KEY_PRODUCCION,
    CLAVE_HMAC_SHA_256: MODE ? process.env.CLAVE_HMAC_SHA_256_TEST : process.env.CLAVE_HMAC_SHA_256_PRODUCCION,
  };
};
