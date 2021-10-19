import { requireAuth } from '@relace/common';
import express from 'express';
import { newCompletionController } from '../../controllers/completion/new.controller';

const router = express.Router();

//TODO: ADD UUID VALIDATION
router.post('/api/orders/:id/complete', requireAuth, newCompletionController);

export { router as newCompletionRouter };