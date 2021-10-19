import { requireAuth, validateRequest } from "@relace/common";
import express from "express";
import { body } from "express-validator";

import { newPaymentController } from "../controllers/new.controller";

const router = express.Router();

router.post('/api/payments', requireAuth, [
    body('orderUuid').isUUID(),
    body('token').notEmpty()
], validateRequest, newPaymentController);

export { router as newPaymentRouter };