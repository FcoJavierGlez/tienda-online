import Product from '../models/Product.model';

const productController = {
    getProductsWithSameTag: async function (req, res) {
        try {
            const searchProduct = await Product.findById( req.params.id );
            console.log( 'tags:', searchProduct.tags );
            const productsTag0 = await Product.find( { _id: { $ne: req.params.id }, tags: searchProduct.tags[0], tags: searchProduct.tags[1], tags: searchProduct.tags[2] } ); /* { _id: { $ne: req.params.id } }, */
            res.status(200).json( productsTag0 );
            // console.log( 'products tag 0:', productsTag0 );
        } catch (error) {
            console.error(error);
            res.status(500).json( { success: false, message: 'Ha habido un error' } );
        }
    }
}

export default productController;