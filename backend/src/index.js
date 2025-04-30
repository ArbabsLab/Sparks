import express from 'express';
import authRoutes from './routes/auth.js';
import dotenv from 'dotenv';
import { DBconnect } from './lib/db.js';

const app = express();
dotenv.config();
const PORT = process.env.PORT;

app.use("/api/auth", authRoutes)
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    DBconnect();
})