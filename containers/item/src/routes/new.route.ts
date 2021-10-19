import { requireAuth, validateRequest } from '@relace/common';
import express from 'express';
import { body } from 'express-validator';

import { newItemController } from '../controllers/new.controller';

const router = express.Router();

router.post('/api/items', requireAuth, [
    body('title').isString(),
    body('subtitle').isString(),
    body('description').isString(),
    body('price').isNumeric(),
], validateRequest, newItemController);

export { router as newItemRouter };