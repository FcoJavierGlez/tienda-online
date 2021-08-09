import Product from '../models/Product.model';

const productController = {
    getProductsWithSameTag: async function (req, res) {
        try {
            const searchProduct = await Product.findById( req.params.id );
            const productsWithSameTag = await Product.find( 
                { 
                    _id: { $ne: req.params.id }, 
                    $or: [
                        { tags: searchProduct.tags[0] },
                        { tags: searchProduct.tags[1] },
                        { tags: searchProduct.tags[2] }
                    ]
                } 
            ).limit(80);
            res.status(200).json( productsWithSameTag );
        } catch (error) {
            console.error(error);
            res.status(500).json( { success: false, message: 'Ha habido un error' } );
        }
    }
}

export default productController;