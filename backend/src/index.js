import express from 'express';
import authRoutes from './routes/auth.js';
import dotenv from 'dotenv';
import { DBconnect } from './lib/db.js';
import cookieParser from "cookie-parser";

const app = express();
dotenv.config();
const PORT = process.env.PORT;

app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", authRoutes);
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    DBconnect();
})