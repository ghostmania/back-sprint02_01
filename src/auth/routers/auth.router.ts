import { Router } from 'express';
import { loginUserHandler } from './handlers/login-user.handler';

export const authRouter = Router({});

authRouter.post('/login', loginUserHandler);
