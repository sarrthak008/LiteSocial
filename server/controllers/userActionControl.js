import User from "../models/user.model.js"
import responder from "../utils/responder.js"

const updateBioOrLocation =async(req,res)=>{
     try {
          if(!req._id){
            return responder(res,null,400,false,"something went wrong")
          }

          let findedUser = await User.findById(req._id)

          if(req?.body?.bio){
            findedUser.user_info.bio = req.body.bio
            await findedUser.save()
          }
          if(req?.body?.location){
            findedUser.user_info.location = req.body.location
            await findedUser.save()
          }
      return responder(res,null,200,true,"updated successfully")


     } catch (error) {
         return responder(res,null,500,false,`${error.message}`)
     }
}


export {updateBioOrLocation}