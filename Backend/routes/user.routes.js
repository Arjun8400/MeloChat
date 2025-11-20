import express from "express"
import { getCurrentUser } from "../controllers/user.controller.js"
import { Auth } from "../midlewere/auth.js"
const userRouter = express.Router()

userRouter.get('/current',Auth, getCurrentUser)



export default userRouter