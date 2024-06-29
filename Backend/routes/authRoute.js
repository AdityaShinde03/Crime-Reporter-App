import express from 'express';
import passport from '../config/passport.js';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

dotenv.config();

const authRouter = express.Router();

authRouter.use(cookieParser());

authRouter.get('/api/v1/auth/google/', passport.authenticate('google', { scope: ['profile', 'email'] }));

authRouter.get('/api/v1/auth/google/callback',
  passport.authenticate('google', { session: false }),
  (req, res) => {
    const { token, id, name } = req.user;
    res.cookie('token', token, { httpOnly: true, secure: true, sameSite: 'strict', path: '/' });
    res.cookie('userId', id.toString(), { httpOnly: false, secure: true, sameSite: 'strict', path: '/' });
    res.cookie('userName', name.toString(), { httpOnly: false, secure: true, sameSite: 'strict', path: '/' });
    res.redirect('http://localhost:5173');
  }
);

export default authRouter;