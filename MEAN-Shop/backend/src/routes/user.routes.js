import { Router } from "express";
import userCtl from "../controllers/user.controller";
import jwt from '../lib/jwt';

const router = Router();

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

/* Direcciones */
router.get( '/addresses', verifyUid, userCtl.getAddresses );
router.post( '/address', verifyUid, userCtl.addAddress );
router.get( '/address/:id', verifyUid, userCtl.getAddress );
router.put( '/address/:id', verifyUid, userCtl.updateAddress );
router.delete( '/address/:id', verifyUid, userCtl.deleteAddress );

/* Formas de pago */
/* router.get('/payments');
router.put('/payments');
router.delete('/payments/:id'); */

export default router;