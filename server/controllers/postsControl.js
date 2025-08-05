import responder from "../utils/responder.js"
import uploadToImageKit from "../utils/uploadToImgKit.js"

const uploadrpofile = async (req,res)=>{

   try {
      if(! req.file){
        return responder(res,null,400,false,"image is required")
      }else{
         let imgInfo = await uploadToImageKit(req.file)
         return responder(res,imgInfo,200,true,"image upload successfully")
      }
   } catch (error) {
      console.log(error)
   }
}


export {uploadrpofile}