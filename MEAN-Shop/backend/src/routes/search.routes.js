import { Router } from "express";
import searchCtl from '../controllers/search.controller';

const router = Router();

router.post( '/', searchCtl.search );

router.post( '/product', searchCtl.searchProduct );

export default router;