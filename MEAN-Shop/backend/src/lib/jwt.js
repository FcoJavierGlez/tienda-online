import jwt from 'jsonwebtoken';
import appConfig from '../config';

const myJwt = (
    () => {
        const genToken = ( data, options = {} ) => jwt.sign( data, appConfig.jwtSecretKey, options );

        const verify = token => {
            try {
                return jwt.verify( token, appConfig.jwtSecretKey );
            } catch (error) {
                return false;
            }
        }

        return {
            genToken: genToken,
            verify: verify,
        }
    }
)();

export default myJwt;