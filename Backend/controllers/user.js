import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import genToken from "../config/genToken.js";

const signUpContoller = async (req, res) => {
  try {
    //! 1. Destructure the required fields
    const { userName, email, password } = req.body;

    // ?--- CRITICAL VALIDATION ---
    // !2. Check if all required fields are present
    if (!userName || !email || !password) {
      return res.status(400).json({ message: "All fields (userName, email, password) are required." });
    }
    //! 3. Password length check
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters." });
    }
    //? --- END CRITICAL VALIDATION ---

    // 4. Check for existing username/email
    const chechUserName = await User.findOne({ userName });
    if (chechUserName) {
      return res.status(400).json({ message: "UserName already exists." });
    }

    const checkEmail = await User.findOne({ email });
    if (checkEmail) {
      return res.status(400).json({ message: "Email already exists." });
    }

    // ! 5. Hash the password (Now 'password' is guaranteed to be a non-empty string)
    const hashedPassword = await bcrypt.hash(password, 10);

    // ! 6. Create the user
    const user = await User.create({
      userName,
      email,
      password: hashedPassword,
    });

    // ! 7. Generate and set token
    const token = genToken(user._id);

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "Strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    return res
      .status(201)
      .json({ user });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error during sign up." });
  }
};

// ! Login User
const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Email not exist" });
    }

    const isMatchPass = await bcrypt.compare(password, user.password);
    if (!isMatchPass) {
      return res.status(400).json({ message: "Incorrect password" });
    }

    const token = genToken(user._id);
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "Strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });
    return res.status(200).json({ user});
  } catch (error) {
    res.status(500).json(`Internal server error ${error}`);
  }
};

const logoutController = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: false,   // localhost par false
      sameSite: "lax",
      path: "/",       // Ye bahut important hai
    });

    return res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    res.status(500).json(`Internal server error ${error}`);
  }
};



export default {
  signUpContoller,
  loginController,
  logoutController,
};
