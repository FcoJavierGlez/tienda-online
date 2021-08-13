import User from '../models/User.model';
import userAddress from '../models/UserAddress.model';

const checkSomeDefaultAddress = addresses => {
    for (let i = 0; i < addresses.length; i++) 
        if ( addresses[i].defaultAddress ) return true;
    return false;
}

const capitalize = address => {
    for ( let values in address ) 
        address[values] = typeof address[values] == 'string' ? 
            address[values].split(' ').map( e => e[0]?.toUpperCase() + e.slice(1, e.length) ).join(' ') : address[values];
}

const getUpdatedArrayAddresses = (newData, addresses) => {
    const address = addresses.find( e => e._id == newData._id );
    for ( let values in newData ) address[values] = newData[values];
    return addresses;
}

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
    getAddress: async function (req,res) {
        try {
            const addresses = ( await User.findOne( { uid: req.uid } ) ).addresses;
            res.status(200).json( addresses.find( e => e._id == req.params.id ) );
        } catch (error) {
            console.error(error);
            res.status(500).json( { success: false, message: 'Ha habido un error' } );
        }
    },
    addAddress: async function (req,res) {
        try {
            const searchUser = await User.findOne( { uid: req.uid } );
            capitalize(req.body);
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
    updateAddress: async function (req,res) {
        try {
            capitalize( req.body );
            req.body._id = req.params.id;
            const addresses = ( await User.findOne( { uid: req.uid } ) ).addresses;
            if ( req.body.defaultAddress ) for ( let address of addresses ) address.defaultAddress = false;
            else if ( !req.body.defaultAddress ) {
                if ( addresses.length == 1 ) req.body.defaultAddress = true;
                else addresses.filter( e => !( e._id == req.params.id ) )[0].defaultAddress = true;
            }
            const newAddresses = getUpdatedArrayAddresses( req.body, addresses );
            await User.findOneAndUpdate( { uid: req.uid }, { addresses: newAddresses } );
            res.status(200).json( { success: true, message: "Dirección actualizada" } );

        } catch (error) {
            console.error(error);
            res.status(500).json( { success: false, message: 'Ha habido un error' } );
        }
    },
    deleteAddress: async function (req,res) {
        try {
            // console.log( 'id',req.params.id );
            let addresses = ( await User.findOne( { uid: req.uid } ) ).addresses;
            addresses = addresses.filter( address => !(address._id == req.params.id) );
            if ( addresses.length && !checkSomeDefaultAddress( addresses ) ) addresses[0].defaultAddress = true;
            await User.findOneAndUpdate( { uid: req.uid }, { addresses: addresses } ); 
            res.status(200).json( { success: true, message: "Eliminada dirección" } );
        } catch (error) {
            console.error(error);
            res.status(500).json( { success: false, message: 'Ha habido un error' } );
        }
    },

    /* payments */
    getPayments: async function (req,res) {
        try {
            const creditCards = ( await User.findOne( { uid: req.uid } ) ).creditCards;
            res.status(200).json( creditCards );
        } catch (error) {
            console.error(error);
            res.status(500).json( { success: false, message: 'Ha habido un error' } );
        }
    },
    updatePayments: async function (req,res) {
        try {
            await User.findOneAndUpdate( { uid: req.uid }, { creditCards: req.body } );
            res.status(200).json( { success: true, message: 'Lista de tarjetas actualizada' } );
        } catch (error) {
            console.error(error);
            res.status(500).json( { success: false, message: 'Ha habido un error' } );
        }
    }
}

export default userController;