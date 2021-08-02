import { config } from "dotenv";
config();

//En caso de no existir el fichero .env se usarán valores por defecto

const OPT_CONFIG = {
    db_conn: process.env.DB_URI || 'mongodb://localhost:27017/auth_jwt',
    cryptoKey: process.env.CRYPTO_KEY || 'BAC809E079F90EA27CF941FBDA019309667A82B79FA3F6AE399BBA379DA58BB7',
    jwtSecretKey: process.env.JWT_SECRET_KEY || '3447FAFDCCD562F713A370F684911A0F6E146339BD8C5631D1893D869DF00FE0',
    jwtRefreshSecretKey: process.env.JWT_REFRESH_SECRET_KEY || 'B36FD08145C04394522A646D6C3DDB865F84B68549EFC3643D0573F80442928C',
    tokenTimeLife: parseInt(process.env.TOKEN_TIME_LIFE) || 500,  //seconds
    refreshTokenTimeLife: parseInt(process.env.REFRESH_TOKEN_TIME_LIFE) || 1000,  //seconds
    fromMail: process.env.FROM_MAIL || '',
    passFromMail: process.env.PASS_FROM_MAIL || '',
    urlSPA: process.env.URL_SPA || 'http://localhost:4200',
}

export default OPT_CONFIG;