import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";

import { DBconnect } from "./lib/db.js";
import authRoutes from "./routes/auth.js";
import messageRoutes from "./routes/message.js";
import { app, server } from "./lib/socket.js"; 
import express from 'express';

dotenv.config();

const PORT = process.env.PORT || 5001;
const __dirname = path.resolve();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
  });
}

const startServer = () => {
  server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    DBconnect();
  });
};

startServer();
