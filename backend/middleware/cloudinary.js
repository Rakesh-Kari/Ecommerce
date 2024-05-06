import cloudinary from "cloudinary";
import fs from "fs";

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key : process.env.CLOUD_API_KEY,
    api_secret : process.env.CLOUD_API_SECRET
})

const uploadOnCloudinary = async (localFilePath) => {
    try {
        
        if(!localFilePath) return null

        //Uploading the file in cloudinary
        const response = await cloudinary.v2.uploader.upload(localFilePath, { resource_type: "auto"})

        console.log("file has been upload on cloudinary", response.url);
        return response;

    } catch(err) {
        fs.unlinkSync(localFilePath) //The uploading operation has been failed so removing the file which is present in the local
        return null
    }
}

export default uploadOnCloudinary;