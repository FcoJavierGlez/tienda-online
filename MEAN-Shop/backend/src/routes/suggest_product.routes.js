import { Router } from "express";
import suggestProductCtl from '../controllers/suggest_product.controller';

const router = Router();

router.get( '/libros', suggestProductCtl.getLibros );
router.get( '/cine', suggestProductCtl.getCine );
router.get( '/bargain', suggestProductCtl.getBargain );

router.get( '/new', suggestProductCtl.getNew );

router.get( '/:id', suggestProductCtl.getProductsWithSameTag );

export default router;