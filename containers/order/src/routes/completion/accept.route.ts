import { requireAuth } from '@relace/common';
import express from 'express';
import { acceptCompletionController } from '../../controllers/completion/accept.controller';

const router = express.Router();

router.put('/api/orders/:id/complete', requireAuth, acceptCompletionController);

export { router as acceptCompletionRouter }