// Express imports
import express from 'express'

// Controller imports
import {
  getMessage,
  getSidebar,
  sendMessage
} from '../controllers/messagecontroller.js'

// Middleware imports
import { checkUser } from '../middleware/authmiddleware.js'

// Create router
const router = express.Router()

// Protected message routes
router.get("/users", checkUser, getSidebar)
router.get("/:id", checkUser, getMessage)
router.post("/send/:id", checkUser, sendMessage)

export default router