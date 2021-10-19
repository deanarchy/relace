import { requireAuth, validateRequest } from '@relace/common';
import express from 'express';
import { body, param } from 'express-validator';

import { updateItemController } from '../controllers/update.controller';

const router = express.Router();

router.put('/api/items/:id', requireAuth, [
    param('id').isUUID(),
    body('title').optional().isString(),
    body('subtitle').optional().isString(),
    body('description').optional().isString(),
    body('price').optional().isNumeric()
], validateRequest, updateItemController);

export { router as updateItemRouter }