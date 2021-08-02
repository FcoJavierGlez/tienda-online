import Product from "../models/Product.model";

const productController = {
    addProduct: async function(req,res) {
        try {
            console.log( req.body );
            await new Product( req.body ).save();
            res.status(200).json( { success: true, message: 'Producto registrado con éxito' } );
        } catch (error) {
            res.status(500).json( { success: false, message: 'Ha habido un error' } );
        }
    },
    viewProduct: async function(req, res) {
        try {
            console.log( req.params.id );
            const productSearch = await Product.findById( req.params.id );
            res.status(200).json( productSearch );
        } catch (error) {
            res.status(500).json( { success: false, message: 'Ha habido un error' } );
        }
    },
    updateProduct: async function(req, res) {
        try {
            console.log( 'ID:',req.params.id );
            console.log( 'Data:',req.body );
            const productSearch = await Product.findByIdAndUpdate( req.params.id, req.body );
            res.status(200).json( { success: true, message: 'Producto actualizado con éxito' } );
        } catch (error) {
            res.status(500).json( { success: false, message: 'Ha habido un error' } );
        }
    }
}

export default productController;