import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
    cloud_name: 'dnb39bn2y',
    api_key: '468765543517719',
    api_secret: 'sSmEYK9KuMy8C2jBw-1SYaEchZc'
});

export const cloudinary_upload = async (localFilePath) => {


    if (!localFilePath) {
        console.error("❌ No file path provided.");
        return null;
    }

    try {
        const uploadResult = await cloudinary.uploader.upload(localFilePath, {
            folder: "uploads",
            use_filename: true,
            unique_filename: false,
            overwrite: true,
        });

        const optimizedUrl = cloudinary.url(uploadResult.public_id, {
            fetch_format: "auto", 
            quality: "auto", 
            secure: true 
        });
        return optimizedUrl;
    } catch (error) {
        console.error("❌ Upload Error:", error);
        return null;
    }
};