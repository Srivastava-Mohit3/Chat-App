import express from 'express'
import { isAuthenticate } from '../middleware/verifytoken.js'
import { sendMessage } from "../controller/message.controller.js"
import { getMessage } from "../controller/message.controller.js"

const router = express.Router()


// router.get("/:id", isAuthenticate, getMessage)
router.get("/:id", isAuthenticate, getMessage)
router.post("/send/:id", isAuthenticate, sendMessage)

export default router