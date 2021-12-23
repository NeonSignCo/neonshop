import Axios from "./Axios";

const uploadImage = (file) => new Promise(async (resolve, reject) => {
    try {
      const data = new FormData();     
      data.append("file", file);
      data.append(
        "upload_preset",
        process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET
      );
      const res = await Axios.post(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUD_NAME}/image/upload`,
        data
        );
        return resolve(res.data);
    } catch (error) { 
      return reject(error)
    }
})

export default uploadImage;