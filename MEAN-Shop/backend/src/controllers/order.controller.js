import Order from '../models/Order.model';
import User from '../models/User.model';
import mailTransport from '../lib/mail';
import appConfig from '../config';

const itemList = order => {
    let list = '';
    order.order.forEach( item => {
        list += `
        <div style="display: flex; align-items: center; margin: 5px auto; border-top: 1px solid black; border-bottom: 1px solid black; padding: 5px 0; max-width: 800px;">
                <img src='${item.images[0]}' heigth="auto" width="80" style="margin: 0 12px" alt="Imagen del producto">
                <div>
                    <p><b>Producto: </b>${item.name}<p>
                    <p><b>Precio/ud: </b>${ ( item.price * ( (100 - item.discount) / 100 ) ).toFixed(2) }€ || <b>Cantidad: </b>x${item.quantity}<p>
                </div>
            </div>
            
        `
    });
    return list;
}

const newOrderMail = ( user, order ) => {
    return (
        {
            from: '"Amz-shop" <developerdaw86.sendmail@gmail.com>',
            to: user.email,
            subject: "Pedido realizado",
            html: `
                <div style="margin: 0px auto; width: 90%;">
                    <h1 style="text-align: center;">Pedido realizado</h1>
                    <p>Gracias por confiar en Amazona. <u>Su pedido está pendiente de ser procesado</u>.</p>
                    <p><u>En cuanto hayamos confirmado la validez del pago</u> procederemos a enviar su compra.</p>
                    ${itemList(order)}
                    <p><b>Total a pagar: ${order.order.map( e => e.price * ( (100 - e.discount) / 100 ) * e.quantity ).reduce( (e, acc) => e + acc ).toFixed(2)} €</b></p>
                    <p>
                        <b><a href='${appConfig.urlSPA}/myorders'>Si desea revisar el pedido visite este enlace</a></b>
                    </p>
                </div>`,
        }
    );
}

const orderController = {
    getUserOrders: async function (req,res) {
        try {
            const userOrders = await Order.find( { uid: req.uid } );
            res.status(200).json( userOrders );
        } catch (error) {
            console.log(error);
            res.status(500).json( { message: 'Parecido que algo ha ido mal.' } );
        }
    },
    getOneUserOrder: async function (req,res) {
        try {
            
        } catch (error) {
            
        }
    },
    newOrder: async function (req,res) {
        try {
            const order = req.body;
            order.uid = req.uid;
            const user = await User.findOne( { uid: req.uid } );
            const result = await new Order( order ).save();
            await User.findOneAndUpdate( { uid: req.uid }, { cart: [] } );
            await mailTransport.sendMail( newOrderMail(user, order) );
            res.status(200).json( { success: true, message: 'Pedido finalizado. En breve recibirás un correo de confirmación.' } );
        } catch (error) {
            console.log(error);
            res.status(500).json( { message: 'Parecido que algo ha ido mal.' } );
        }
    }
}

export default orderController;