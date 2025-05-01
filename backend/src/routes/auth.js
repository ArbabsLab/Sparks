import express from 'express';
import { login, logout, signup, update, checkAuth } from '../controllers/authcontroller.js';
import { checkUser } from '../middleware/authmiddleware.js';

const router = express.Router()

router.post("/signup", signup)

router.post("/login", login)

router.post("/logout", logout)

router.put("/update", checkUser, update)

router.get("/check", checkUser, checkAuth)

export default router;