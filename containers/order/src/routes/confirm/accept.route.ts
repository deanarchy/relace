import { requireAuth } from '@relace/common';
import express from 'express';

import { acceptOrderController } from '../../controllers/confirm/accept.controller';

const router = express.Router();

router.put('/api/orders/:id/request', requireAuth, acceptOrderController);

export { router as acceptOrderRouter };