import { Router } from "express";
import accessCtl from "../controllers/access.controller";
import jwt from '../lib/jwt';

const router = Router();

/* const verifyToken = (req, res) => {
    if (req.headers.authorization == undefined) return res.status(401).json( { profile: '', message: 'Es requerido un token' } );
    const token = req.headers.authorization.match(/^Bearer\s([\w\-\.]+)/)?.[1];
    if ( token == undefined) return res.status(400).json( { profile: '', message: 'Envio de token incorrecto' } );
    return token;
}
 */
const verifyUid = (req,res,next) => {
    //console.log('Petición: ',req.headers.authorization);
    if (req.headers.authorization == undefined) return res.status(401).json( { profile: '', message: 'Es requerido un token' } );
    const token = req.headers.authorization.match(/^Bearer\s([\w\-\.]+)/)?.[1];
    if ( token == undefined) return res.status(400).json( { profile: '', message: 'Envio de token incorrecto' } );
    //console.log(jwt.verify( token ));
    req.uid = jwt.verify( token ).uid;
    if (!req.uid) return res.status(401).json( { profile: '', message: 'Token inválido' } );
    next();
}

const getRefreshToken = (req,res,next)=> {
    //console.log('Token de refesco: ',req.headers.authorization);
    if (req.headers.authorization == undefined) return res.status(401).json( { profile: '', message: 'Es requerido un token' } );
    req.refresh = req.headers.authorization.match(/^Bearer\s([\w\-\.]+)/)?.[1];
    if ( req.refresh == undefined) return res.status(400).json( { profile: '', message: 'Envio de token incorrecto' } );
    next();
}

router.post( '/login', accessCtl.login );

router.post( '/register', accessCtl.register );

router.get( '/profile', verifyUid, accessCtl.getProfile );

router.put( '/activate', verifyUid, accessCtl.activateAccount );

router.get( '/refresh', getRefreshToken, accessCtl.refreshToken );

export default router;