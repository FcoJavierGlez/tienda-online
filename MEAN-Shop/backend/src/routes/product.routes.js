import { Router } from "express";
import productCtl from "../controllers/product.controller";

const router = Router();

router.post( '/', productCtl.addProduct );

router.get( '/:id', productCtl.viewProduct );

router.put( '/:id', productCtl.updateProduct );

export default router;