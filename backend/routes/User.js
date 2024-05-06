// userRoute.js
import express from "express";
import { registerUser, refreshToken, Login, Logout, getUserDetails } from "../controllers/User.js";
import { AuthMiddleware } from "../middleware/auth.js";

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.get('/refresh_token', refreshToken);
userRouter.post('/login', Login);
userRouter.get('/logout', Logout);
userRouter.get('/information', AuthMiddleware, getUserDetails );

export default userRouter;
