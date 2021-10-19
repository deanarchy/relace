import { requireAuth } from '@relace/common';
import express from 'express';

import { indexOrderController } from '../controllers/index.controller';

const router = express.Router();

router.get('/api/orders', requireAuth, indexOrderController)

export { router as indexOrderRouter };