import { validateRequest } from '@relace/common';
import express from 'express';
import { body } from 'express-validator';

import { signinController } from '../controllers/signin.controller';

const router = express.Router();

router.post('/api/auth/signin', [
    body('email')
        .isEmail()
        .withMessage('email must be valid'),
    body('password')
        .notEmpty()
        .withMessage('Password must be valid')
], validateRequest, signinController);

export { router as signinRouter };