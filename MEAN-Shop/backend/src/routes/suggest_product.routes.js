import { Router } from "express";
import suggestProductCtl from '../controllers/suggest_product.controller';

const router = Router();

router.get( '/:id', suggestProductCtl.getProductsWithSameTag );

export default router;