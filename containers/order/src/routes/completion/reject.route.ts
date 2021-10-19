import { requireAuth } from '@relace/common';
import express from 'express';

import { rejectCompletionController } from '../../controllers/completion/reject.controller';

const router = express.Router();

router.delete('/api/orders/:id/complete', requireAuth, rejectCompletionController);

export { router as rejectCompletionRouter }