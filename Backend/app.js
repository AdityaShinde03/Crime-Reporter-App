import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/database.js';
import userRouter from './routes/userRoutes.js';
import authRouter from "./routes/authRoute.js"
import passport from './config/passport.js';
import reportRouter from './routes/reportRoutes.js';

dotenv.config();
connectDB();

const app = express();

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
  }));
app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize());

app.use("/api/v1", userRouter);
app.use("/api/v1", reportRouter);
app.use("",authRouter);

export default app;