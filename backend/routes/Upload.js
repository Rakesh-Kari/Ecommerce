import express from "express";
import multer from "multer";
import { uploadImage } from "../controllers/Upload.js";

const uploadRouter = express.Router();

// Configure Multer storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./upload/image")
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
});

// Initialize Multer upload
const upload = multer({ storage });

uploadRouter.get('/image',  upload.single('file'), uploadImage )

export default uploadRouter;
