import express from "express";
import mongoose from "mongoose";
import userRouter from "./routes/User.js";
import categoryRouter from './routes/Category.js';
import productRouter from './routes/Product.js';
import 'dotenv/config';
import cookieParser from "cookie-parser";
import uploadRouter from "./routes/Upload.js";
import cors from "cors"

const app = express();
const router = express.Router();
app.use(cors());

const URI = process.env.MONGODB_URL;

app.use(express.json());
app.use(cookieParser());
app.use("/api/v1/user", userRouter);
app.use("/api/v1/category", categoryRouter);
app.use("/api/v1/products", productRouter);
app.use("/api/v1/upload", uploadRouter);

mongoose.connect(URI, {
    dbName: 'ECommerce',
  }).then(() => console.log("MongoDB has been connected")).catch((err) => console.error(err));

app.listen(3000, () => {
    console.log("server running on port 3000")
});
