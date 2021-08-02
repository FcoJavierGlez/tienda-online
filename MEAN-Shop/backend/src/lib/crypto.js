import CryptoJS from 'crypto-js';
import appConfig from '../config';

const crypo = (
    () => {
        const KEY = appConfig.cryptoKey;

        /**
         * Cifra una entrada de datos del tipo String.
         * 
         * @param {String} input Entrada de datos a cifrar
         * @return {String}      Resultado cifrado
         */
        const encrypt = input => CryptoJS.AES.encrypt( input, KEY ).toString();

        /**
         * Devuelve la información original descifrada en forma de String.
         * 
         * @param {String} input Entrada de datos a descrifrar
         * @return {String}      Resultado descifrado
         */
        const decrypt = input => CryptoJS.AES.decrypt( input, KEY ).toString( CryptoJS.enc.Utf8 );

        return {
            encrypt: encrypt,
            decrypt: decrypt
        }
    }
)();

export default crypo;