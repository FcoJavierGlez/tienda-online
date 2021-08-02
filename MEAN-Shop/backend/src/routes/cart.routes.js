import { Router } from "express";
import cartCtl from "../controllers/cart.controller";
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

router.get('/', verifyUid, cartCtl.viewCart );

router.put('/', verifyUid, cartCtl.updateCart );

router.put('/empty', verifyUid, cartCtl.emptyCart );

export default router;