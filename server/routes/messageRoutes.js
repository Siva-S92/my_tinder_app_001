import express from 'express'
import { protectRoute } from '../utils/middleware/auth.js'
import { getConcersation, sendMessage } from '../controllers/messageController.js'


const router = express.Router()

// router.use(protectRoute)

router.post("/send", protectRoute, sendMessage)
router.get("/conversation/:userId", protectRoute, getConcersation)


export default router