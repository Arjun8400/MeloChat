import mongoose from "mongoose";

const connectDB = async()=>{
    try {
        await mongoose.connect(process.env.MONGODB_URL)
        console.log(`DataBase connect successfully`)
    } catch (error) {
        console.log(`DB connect failled ${error}`)
    }
}

export default connectDB