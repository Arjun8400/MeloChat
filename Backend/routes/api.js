import express from "express"
import userController from "../controllers/user.js"

const authRoutes = express.Router()

authRoutes.post('/create', userController.signUpContoller)
authRoutes.post('/login', userController.loginController)
authRoutes.get('/logout', userController.logoutController)


export default authRoutes

