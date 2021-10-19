import { requireAuth, validateRequest } from '@relace/common';
import express from 'express';
import { body } from 'express-validator';

import { newOrderController } from '../controllers/new.controller';


const router = express.Router();

router.post('/api/orders', requireAuth, [
    body('itemUuid').isUUID()
], validateRequest, newOrderController)

export { router as newOrderRouter };