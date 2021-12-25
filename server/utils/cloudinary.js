import { v2 as cloudinaryV2 } from 'cloudinary'


const cloudinary = () => {
    cloudinaryV2.config({
      cloud_nameL: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });
}


export default cloudinary;