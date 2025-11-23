import express from "express"
import { editProfileContoller, getCurrentUser } from "../controllers/user.controller.js"
import { Auth } from "../midlewere/auth.js"
import upload from'../midlewere/multer.js'
const userRouter = express.Router()

userRouter.get('/current',Auth, getCurrentUser)
userRouter.put('/profile',Auth,upload.single("image"),editProfileContoller)



export default userRouter