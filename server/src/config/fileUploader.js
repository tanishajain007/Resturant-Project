import { v2 as cloudinary } from "cloudinary";
import env from "./env.js"
// v2 - version 2

cloudinary.config({
    cloud_name: env.CLOUDINARY_CLOUD_NAME,
    api_key: env.CLOUDINARY_API_KEY,
    api_secret: env.CLOUDINARY_API_SECRET,
});

const fileUploader = async (filePath, folderPath) => {
    try {
        return await cloudinary.uploader.upload(filePath, {
            resource_type: "image",
            foleder: folderPath,
        });
    } catch (error) {
        console.log("Found Error", err)
    }
}

export default fileUploader;