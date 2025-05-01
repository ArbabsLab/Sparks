import express from 'express';
import { login, logout, signup } from '../controllers/authcontroller.js';

const router = express.Router()

router.post("/signup", (req, res) => {
    signup();
})

router.post("/login", (req, res) => {
    login();
})

router.post("/logout", (req, res) => {
    logout();
})

router.post("/update", (req, res) => {
    update();
})

export default router;