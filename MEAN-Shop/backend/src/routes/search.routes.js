import { Router } from "express";
import searchCtl from '../controllers/search.controller';

const router = Router();

router.post( '/', searchCtl.suggestions );

router.post( '/product', searchCtl.search );

router.get( '/product/:id', searchCtl.viewProduct );

export default router;