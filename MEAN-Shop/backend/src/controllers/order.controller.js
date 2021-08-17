import Order from '../models/Order.model';
import User from '../models/User.model';

const orderController = {
    getUserOrders: async function (req,res) {
        try {
            
        } catch (error) {
            
        }
    },
    getOneUserOrder: async function (req,res) {
        try {
            
        } catch (error) {
            
        }
    },
    newOrder: async function (req,res) {
        try {
            // console.log(req.uid);
            // console.log(req.body);
            const order = req.body;
            order.uid = req.uid;
            const result = await new Order( order ).save();
            await User.findOneAndUpdate( { uid: req.uid }, { cart: [] } );
            res.status(200).json( { success: true, message: 'Pedido finalizado. En breve recibirás un correo de confirmación.' } );
        } catch (error) {
            console.log(error);
            res.status(500).json( { message: 'Parecido que algo ha ido mal.' } );
        }
    }
}

export default orderController;