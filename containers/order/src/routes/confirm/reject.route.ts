import { requireAuth } from '@relace/common';
import express from 'express';

import { rejectOrderController } from '../../controllers/confirm/reject.controller';

const router = express.Router();

router.delete('/api/orders/:id/request', requireAuth, rejectOrderController);

export { router as rejectOrderRouter };