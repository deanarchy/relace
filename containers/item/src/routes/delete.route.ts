import { requireAuth, validateRequest } from '@relace/common';
import express from 'express';
import { param } from 'express-validator';

import { deleteItemController } from '../controllers/delete.controller';

const router = express.Router();

router.delete('/api/items/:id', requireAuth, [
    param('id').isUUID()
], validateRequest, deleteItemController)

export { router as deleteItemRouter }