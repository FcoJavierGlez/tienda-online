import User from '../models/User.model';
import userAddress from '../models/UserAddress.model';

const userController = {
    /* User */
    /* [...] */

    /* Addresses */
    getAddresses: async function (req,res) {
        try {
            const addresses = ( await User.findOne( { uid: req.uid } ) ).addresses.sort( (a1,a2) => a2.defaultAddress - a1.defaultAddress );
            res.status(200).json( addresses );
        } catch (error) {
            console.error(error);
            res.status(500).json( { success: false, message: 'Ha habido un error' } );
        }
    },
    updateAddresses: async function (req,res) {
        try {
            const searchUser = await User.findOne( { uid: req.uid } );
            if (!searchUser.addresses?.length) {
                req.body.defaultAddress = true;
                const newAddress = await new userAddress( req.body );
                await User.findOneAndUpdate( { uid: req.uid }, { $push: { addresses: newAddress  } } );
                return res.status(200).json( { success: true, message: "Dirección añadida" } );
            }
            const addresses = ( await User.findOne( { uid: req.uid } ) ).addresses;
            if ( req.body.defaultAddress ) for ( let address of addresses ) address.defaultAddress = false;
            addresses.push( await new userAddress( req.body ) );
            await User.findOneAndUpdate( { uid: req.uid }, { addresses: addresses } );
            res.status(200).json( { success: true, message: "Dirección añadida" } );
        } catch (error) {
            console.error(error);
            res.status(500).json( { success: false, message: 'Ha habido un error' } );
        }
    },
}

export default userController;