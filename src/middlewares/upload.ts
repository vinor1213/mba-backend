import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary";

const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: "mba_uploads",
         allowed_formats: ["jpg", "png", "jpeg", "webp"],
    } as {
        folder: string;
        allowed_formats: string[];
    },
});

const upload = multer({ storage });

export default upload;
