import { validateRequest } from '@relace/common';
import express from 'express';
import { param } from 'express-validator';

import { showItemController } from '../controllers/show.controller';

const router = express.Router();

router.get('/api/items/:id', [
    param('id').isUUID()
], validateRequest, showItemController);

export { router as showItemRouter }