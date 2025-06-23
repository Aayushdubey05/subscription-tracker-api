import { Router } from 'express';
import { signUp, signIn, signOut } from '../controllers/auth.controller.js'
const authRouter = Router();

//path: api/v1/auth/signup
authRouter.post('/signup', signUp);

authRouter.post('/login', signIn);

authRouter.post('/logout', signOut);

export default authRouter;
