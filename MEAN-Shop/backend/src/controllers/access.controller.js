import crypo from '../lib/crypto';
import jwt from '../lib/jwt';
import utils from '../lib/utils';
import appConfig from '../config';
import mailTransport from '../lib/mail';

import User from '../models/User.model';
import Token from '../models/Token.model';

async function genUid() {
    let uid = '';
    do {
        uid = utils.genHexa( 64 );
    } while ( await User.findOne( { uid } ) );
    return uid;
}

async function preSaveUser(data) {
    data.password = crypo.encrypt( data.password );
    /* data.profile  = 'USER';
    data.state    = 'PENDING'; */
    data.uid      = await genUid();
}

const saveToken = ( userUID, token = '' ) => {
    return (
        { 
            uid: userUID, 
            token: token 
        }
    );
}

const dataMail = ( user, token = '' ) => {
    return (
        {
            from: '"Registro Amz-shop 👻" <developerdaw86.sendmail@gmail.com>', // sender address
            to: user.email,
            subject: "Activación de cuenta",
            html: `
                <b>
                    <a href='${appConfig.urlSPA}/register?activate=${token}'>Para activar su cuenta pulse en el siguiente enlace</a>
                </b>`,
        }
    );
}

const accessController = {
    login: async function (req,res) {
        const DATA_LOGIN = { 
            success: false,
        }
        try {
            const user = await User.findOne( { email: req.body.email } );
            if ( req.body.password !== crypo.decrypt( user.password ) || user.state == 'PENDING' ) {
                DATA_LOGIN.message = user.state == 'PENDING' ? 'Cuenta pendiente de ser activada' : 'Correo y/o contraseña incorrectos';
                return res.status(401).json( DATA_LOGIN );
            }
            DATA_LOGIN.success = true;
            DATA_LOGIN.token   = jwt.genToken( { uid: user.uid }, { expiresIn: appConfig.tokenTimeLife } );
            DATA_LOGIN.refresh = jwt.genToken( { uid: user.uid }, { expiresIn: appConfig.refreshTokenTimeLife } );
            DATA_LOGIN.profile = jwt.genToken( { uid: user.uid, profile: user.profile }, { expiresIn: '1h' } );
            //console.log(DATA_LOGIN);
            await Token.findOneAndUpdate( { uid: user.uid }, { token: DATA_LOGIN.refresh } );
            res.status(200).json( DATA_LOGIN );
        } catch (error) {
            DATA_LOGIN.message = 'Correo y/o contraseña incorrectos';
            return res.status(401).json( DATA_LOGIN );
        }
    },
    register: async function (req,res) {
        try {
            const searchUser = await User.findOne( { email: req.body.email } );
            if ( searchUser ) return res.status(400).json( { success: false, code_error: 1, message: "Éste correo ya había sido registrado previamente" } );

            await preSaveUser( req.body );
            const user = await new User( req.body ).save();
            const registerToken = jwt.genToken( { uid: user.uid }, { expiresIn: '3d' } );
            //console.log( registerToken );
            await new Token( { uid: user.uid } ).save();
            //await mailTransport.sendMail( dataMail(user, registerToken) );
            res.status(200).json( { success: true, code_error: 0, message: "Registrado satisfactoriamente. En breve recibirás un correo de confirmación." } );
        } catch (error) {
            //console.log(error);
            res.status(500).json( { success: false, code_error: 2, message: "Algo salió mal." } );
        }
    },
    activateAccount: async function (req,res) {
        try {
            const searchUser = await User.findOne( { uid: req.uid } );
            if ( searchUser.state !== 'PENDING' ) return res.status(400).json( { message: "Tu cuenta ya está activada" } );
            await User.findOneAndUpdate( { uid: searchUser.uid }, { state: 'ACTIVE' } );
            res.status(200).json( { message: "Tu cuenta ha sido activada satisfactoriamente" } );
        } catch (error) {
            res.status(500).json( { message: "It seems that something went wrong" } );
        }
    },
    refreshToken: async function (req,res) {
        try {
            const tokenVerified = jwt.verify( req.refresh );
            const tokenRefreshDB = await Token.findOne( { uid: tokenVerified.uid } );
            if ( tokenVerified.uid == undefined ) return res.status(400).json( { message: 'Token caducado' } );
            if ( tokenRefreshDB.token !== req.refresh ) return res.status(400).json( { message: 'Token inválido' } );
            const user = await User.findOne( { uid: tokenVerified.uid } );
            const newToken = jwt.genToken( { uid: tokenVerified.uid }, { expiresIn: appConfig.tokenTimeLife } );
            const newRefreshToken = jwt.genToken( { uid: tokenVerified.uid }, { expiresIn: appConfig.refreshTokenTimeLife } );
            const newProfileToken = jwt.genToken( { uid: user.uid, profile: user.profile }, { expiresIn: '1h' } );
            await Token.findOneAndUpdate( { uid: tokenVerified.uid }, { token: newRefreshToken } );
            res.status(200).json( { token: newToken, refresh: newRefreshToken, profile: newProfileToken } );
        } catch (error) {
            res.status(500).json( { message: "It seems that something went wrong" } );
        }
    },
    getProfile: async function (req,res) {
        try {
            const user = await User.findOne( { uid: req.uid } );
            res.status(200).json( { profile: user.profile } );
        } catch (error) {
            res.status(500).json( { message: "It seems that something went wrong" } );
        }
    }
}

export default accessController;