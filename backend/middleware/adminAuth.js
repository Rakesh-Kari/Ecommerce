import { User } from "../models/User.js"

export const adminAuth = async (req, res, next) => {
    try {

        const user = await User.findOne({
            _id: req.user.id
        })

        if(user.role === 0){
            return res.status(400).json({message: "Admin access required"})
        } 
        next();
        

    } catch(err) {
        return res.status(500).json({ message: err.message})
    }
}