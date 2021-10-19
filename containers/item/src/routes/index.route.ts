import express from 'express';

import { indexItemController } from '../controllers/index.controller';

const router = express.Router();

router.get('/api/items', indexItemController);

export { router as indexItemRouter };