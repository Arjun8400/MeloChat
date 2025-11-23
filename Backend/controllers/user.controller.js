import uploadCloudnary from "../config/cloudinary.js";
import User from "../models/user.model.js";

export const getCurrentUser = async (req, res) => {
    try {
        let userId = req.userId;
        const user = await User.findById(userId).select("-password");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.status(200).json(user)
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
}

export const editProfileContoller = async (req, res) =>{
  try {
    const {name} =req.body
    let image
    if(req.file){
        image= await uploadCloudnary(req.file.path)
    }

    const user = await User.findByIdAndUpdate(req.userId,{
        name,
        image
    })

    if(!user){
        return res.status(400).json({message: "Current user not found."})
    }
    return res.status(200).json(user)
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
}