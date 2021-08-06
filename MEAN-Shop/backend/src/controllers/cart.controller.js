import User from '../models/User.model';

const cartController = {
    viewCart: async function (req,res){
        try {
            const searchUser = await User.findOne( { uid: req.uid } );
            //console.log( searchUser.cart );
            res.status(200).json( searchUser.cart );/* { cart: searchUser.cart } */
        } catch (error) {
            res.status(500).json( { success: false, message: 'Hubo un error al procesar la solicitud', error: error } );
        }
    },
    updateCart: async function (req,res){
        try {
            // console.log(req.body.cart);
            const searchUser = await User.findOneAndUpdate( { uid: req.uid }, { cart: req.body.cart } );
            // console.log( searchUser );
            res.status(200).json( { success: true, message: 'Cesta actualizada' } );
        } catch (error) {
            res.status(500).json( { success: false, message: 'Hubo un error al procesar la solicitud', error: error } );
        }
    },
    emptyCart: async function (req,res){
        try {
            /* const searchUser = await User.findOne( { uid: req.uid } );
            console.log( searchUser.cart ); */
            await User.findOneAndUpdate( { uid: req.uid }, { cart: [] } );
            res.status(200).json( { success: true, message: 'Cesta vaciada' } );
        } catch (error) {
            res.status(500).json( { success: false, message: 'Hubo un error al procesar la solicitud', error: error } );
        }
    },
}

export default cartController;