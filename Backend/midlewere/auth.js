import jwt from 'jsonwebtoken'

export const Auth = async (req, res, next) => {
    try {

        console.log("Cookies from client:", req.cookies)
        
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        let varifyToken = jwt.verify(token, process.env.JWT_SECRET);
        console.log(varifyToken)
        req.userId = varifyToken.userId
        next();
    } catch (error) {
        return res.status(401).json({ message: "Unauthorized" });
    }
}