import jwt from "jsonwebtoken";

export const AuthMiddleware =  async (req, res, next) => {
    try {
        const token = req.headers.authorization;
        if(!token) {
            return res.status(500).json({message: "Invalid Authentication"})
        }
        jwt.verify(token, process.env.JWT_SECRET , (err, user) => {
            if(err) return res.status(500).json({message: "INvalid credentials"})
            req.user = user;
            next();
        })
    } catch(err) {
        return res.status(500).json({ message: err.message})
    }
}