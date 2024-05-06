
import uploadOnCloudinary from "../middleware/cloudinary.js";


export const uploadImage =  async (req, res) => {
    try {
        // Check if file is present in the request
        if (!req.file) {
            return res.status(400).json({ msg: "No file was uploaded" });
        }

        // Upload file to Cloudinary
        const cloudinaryResponse = await uploadOnCloudinary(req.file.path);

        // Check if the file was uploaded to Cloudinary successfully
        if (!cloudinaryResponse) {
            return res.status(500).json({ msg: "Failed to upload file to Cloudinary" });
        }

        // Send response with Cloudinary URL
        res.json({ public_id: cloudinaryResponse.public_id, url: cloudinaryResponse.secure_url });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}








