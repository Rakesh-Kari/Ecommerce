import { User } from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({
                message: "User already registered"
            });
        }
        if (password.length < 6) {
            return res.status(400).json({
                message: "Password should be at least 6 characters long"
            });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({
            name, email, password: hashedPassword
        });
        const accessToken = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
        const refreshToken = jwt.sign({ id: newUser._id }, process.env.JWT_REFRESH_SECRET, { expiresIn: '1d' });
        
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            path: '/api/v1/user/refresh_token'
        });
        res.status(200).json({
            accessToken,
            message: "User has been created successfully"
        });

    } catch(err) {
        return res.status(500).json({
            message: err.message
        });
    }
}

export const refreshToken = async (req, res) => {
    try {
        const rfToken = req.cookies.refreshToken;

        if (!rfToken) return res.status(400).json({ msg: "Please login or register" });

        jwt.verify(rfToken, process.env.JWT_REFRESH_SECRET, (err, user) => {
            if (err) return res.status(400).json({ msg: "Please login or register" });
            const accessToken = jwt.sign({ id:user }, process.env.JWT_REFRESH_SECRET, { expiresIn: '1d' });
            res.json({user, accessToken });
        });

    } catch (err) {
        return res.status(500).json({ msg: err.message });
    }
}

export const Login = async (req,res) => {
    try {
        const { email, password} = req.body;

        const user = await User.findOne({email})
        if(!user)  return res.json({ message: "User does not exists"})
        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch) return res.status(400).json({message: "Wrong password"})
        const accessToken = jwt.sign({id: user._id}, process.env.JWT_SECRET);
        const refreshToken = jwt.sign({id: user._id}, process.env.JWT_REFRESH_SECRET);

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            path: '/api/v1/user/refresh_token'
        })

        res.json({accessToken, refreshToken})
    } catch(err) {
        res.status(500).json({ message: "There is an error message"})
    }
}

export const Logout = async (req,res) => {
    try {
        res.clearCookie('refreshToken', {path: '/api/v1/refresh_token'})
        return res.json({message: "user has been logged out"})
    } catch(err) {
        return res.status(500).json({message: "There is some error"})
    }
}

export const getUserDetails = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password')
        if(!user) return res.status(400).json({ message: "User has not found"})
        res.json({user});
    } catch(err) {
        return res.status(500).json({message: ""})
    }
}


