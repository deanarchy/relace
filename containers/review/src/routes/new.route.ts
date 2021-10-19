import { requireAuth, validateRequest } from '@relace/common';
import express from 'express';
import { body, param } from 'express-validator';
import { newReviewController } from '../controllers/new.controller';

const router = express.Router();

router.post('/api/items/:id/reviews', requireAuth, [
    param('id')
        .isUUID(),
    body('rating')
        .isInt({ min: 1, max: 10 }),
    body('description')
        .isString()
], validateRequest, newReviewController);

export { router as newReviewRouter };