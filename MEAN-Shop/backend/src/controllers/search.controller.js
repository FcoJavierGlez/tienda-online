import Tag from "../models/Tag.model";
import Product from "../models/Product.model";
import utils from '../lib/utils';

const searchController = {
    search: async function (req,res) {
        try {
            const regexSearch = utils.normalizeSearchRegExp(req.body.search);
            const searchTag = await Tag.find( { name: new RegExp( regexSearch, 'i' ) } )
                                        .limit(10)
                                        .sort( { search: -1 } );
            res.status(200).json( searchTag );
        } catch (error) {
            console.log(error);
            res.status(500).json( { success: false, message: 'Ha habido un error al procesar su solicitud' } );
        }
    },
    searchProduct: async function (req,res) {
        try {
            let searchProduct;

            if (req.body.search == undefined || req.body.search == '') {
                searchProduct = await Product.find();
                return res.status(200).json( searchProduct );
            }
            const regexSearch = utils.normalizeSearchRegExp(req.body.search);
            const tag = await Tag.findOne( { name: new RegExp( `^${regexSearch}$`, 'i' ) } );

            if (tag == null) searchProduct = await Product.find( { name: new RegExp(regexSearch, 'i') } );
            else {
                await Tag.findByIdAndUpdate( tag._id, { $inc: { search: 1 } });
                searchProduct = await Product.find( { tags: tag.name } );
            }
            res.status(200).json( searchProduct );
        } catch (error) {
            console.log(error);
            res.status(500).json( { success: false, message: 'Ha habido un error al procesar su solicitud' } );
        }
    },
}

export default searchController;