import { validateRequest } from '@relace/common';
import { Router } from 'express'
import { body } from 'express-validator';

import { signupController } from '../controllers/signup.controller';

const router = Router();

router.post('/api/auth/signup', [
    body('email')
        .isEmail()
        .withMessage('email must be valid'),
    body('password')
        .trim()
        .isLength({ min: 4 })
        .withMessage('password must be valid')
], validateRequest, signupController);

export { router as signupRouter };