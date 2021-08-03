import Tag from "../models/Tag.model";
import Product from "../models/Product.model";

const searchController = {
    search: async function (req,res) {
        try {
            console.log(req.body);
            const searchTag = await Tag.find( { name: new RegExp( req.body.search, 'i' ) } )
                                        .limit(4)
                                        .sort( { search: -1 } );
            res.status(200).json( searchTag );
        } catch (error) {
            
        }
    },
    searchProduct: async function (req,res) {
        try {
            if (req.body.search == undefined || req.body.search == '') return;
            let searchProduct;
            const tag = await Tag.findOne( { name: req.body.search } );

            if (tag == null) searchProduct = await Product.find( { name: new RegExp(req.body.search, 'i') } );
            else searchProduct = await Product.find( { tags: tag.name } );

            res.status(200).json( searchProduct );
        } catch (error) {
            
        }
    },
}

export default searchController;