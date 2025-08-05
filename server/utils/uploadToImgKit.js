import imageKitConfig from "../config/imagekitConfig.js";
import fs from "fs"

const uploadToImageKit = async (file) => {
    try {
        let imagekit = imageKitConfig()
        let uploadInfo = await imagekit.upload({
            file: fs.readFileSync(file.path),
            fileName:file.originalname,
            folder: "/liteSocial"
        })
        fs.unlinkSync(file.path)

        if(uploadInfo){
            return uploadInfo.url
        }else{
            return null
        }

    } catch (error) {
      return null
    }
}


export default uploadToImageKit;