import Product from "../models/Product.model";
import Tag from "../models/Tag.model";


const lowerTags = newProduct =>  newProduct.tags = newProduct.tags.map( e => e.toLowerCase() );

async function addNewTags( newProduct ) {
    if (!newProduct.tags?.length) return;
    const tags = lowerTags( newProduct );
    for (let i = 0; i < tags.length; i++) {
        try {
            const searchTag = await Tag.findOne( { name: tags[i] } );
            if (searchTag) continue;
            await new Tag( { name: tags[i] } ).save();
        } catch (error) { }
    }
}

const productController = {
    addProduct: async function(req,res) {
        try {
            addNewTags( req.body );
            await new Product( req.body ).save();
            res.status(200).json( { success: true, message: 'Producto registrado con éxito' } );
        } catch (error) {
            res.status(500).json( { success: false, message: 'Ha habido un error' } );
        }
    },
    viewProduct: async function(req, res) {
        try {
            //console.log( req.params.id );
            const productSearch = await Product.findById( req.params.id );
            res.status(200).json( productSearch );
        } catch (error) {
            res.status(500).json( { success: false, message: 'Ha habido un error' } );
        }
    },
    updateProduct: async function(req, res) {
        try {
            //console.log( 'ID:',req.params.id );
            //console.log( 'Data:',req.body );
            addNewTags( req.body );
            await Product.findByIdAndUpdate( req.params.id, req.body );
            res.status(200).json( { success: true, message: 'Producto actualizado con éxito' } );
        } catch (error) {
            res.status(500).json( { success: false, message: 'Ha habido un error' } );
        }
    }
}

export default productController;