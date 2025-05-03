import express from 'express';
import { checkUser } from '../middleware/authmiddleware.js';
import { getMessage, getSidebar } from '../controllers/messagecontroller.js';

const router = express.Router();

router.get("/users", checkUser, getSidebar);
router.get("/:id", checkUser, getMessage)



export default router;