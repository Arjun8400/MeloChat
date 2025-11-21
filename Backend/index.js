import e from "express";
import dotenv from 'dotenv'
import cors from 'cors'
import connectDB from "./config/db.js";
import cookieParser from "cookie-parser"
import authRoutes from "./routes/api.js";
import userRouter from "./routes/user.routes.js";

dotenv.config()


const app = e()
const port = process.env.PORT || 5001
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))

app.use(e.json())
app.use(cookieParser())

app.use('/api', authRoutes)
app.use('/api/user', userRouter)

connectDB()
app.listen(port, ()=>{
    console.log(`server running port ${port}`)
})