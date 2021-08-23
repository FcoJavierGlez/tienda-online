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
    },
    getLibros: async function (req,res) {
        try {
            const books = await Product.find( { tags: "libros" } ).sort( { createdAt: -1 } ).limit(4);
            res.status(200).json( books );
        } catch (error) {
            console.error(error);
            res.status(500).json( { success: false, message: 'Ha habido un error' } );
        }
    },
    getCine: async function (req,res) {
        try {
            const cine = await Product.find( { tags: "películas" } ).sort( { createdAt: -1 } ).limit(4);
            res.status(200).json( cine );
        } catch (error) {
            console.error(error);
            res.status(500).json( { success: false, message: 'Ha habido un error' } );
        }
    },
    getBargain: async function (req,res) {
        try {
            const bargain = await Product.find().sort( { discount: -1 } ).limit(1);
            res.status(200).json( bargain[0] );
        } catch (error) {
            console.error(error);
            res.status(500).json( { success: false, message: 'Ha habido un error' } );
        }
    },
    getNew: async function (req,res) {
        try {
            const products = await Product.find().sort( { createdAt: -1 } ).limit(10);
            res.status(200).json( products );
        } catch (error) {
            console.error(error);
            res.status(500).json( { success: false, message: 'Ha habido un error' } );
        }
    }
}

export default productController;