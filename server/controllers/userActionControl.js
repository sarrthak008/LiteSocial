import User from "../models/user.model.js"
import responder from "../utils/responder.js"
import uploadToImageKit from "../utils/uploadToImgKit.js"
import Posts from "../models/post.model.js"

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


const uploadPost = async (req,res) => {
    try {
        //  console.log(req._id,req.file)

         if(!req._id || !req.file){
            return responder(res,null,400,false,"something went wrong")
         }

         let {title ,description } = req.body
            
         if(!req.body.title || ! req.body.description){
            return responder(res,null,400,false,"title and description is required")
         }


         let findedUser = await User.findById(req._id)
         if(!findedUser){
            return responder(res,null,400,false,"user not found")
         }

         let imgurl = await uploadToImageKit(req.file);

         if(!imgurl){
            return responder(res,null,400,false,"server is busy please try again later");
         }

         let newPost = await Posts.create({
            title:title,
            description:description,
            image:imgurl
         })

         findedUser.posts.push(newPost?._id);
         await findedUser.save();
         await newPost.save()
         return responder(res,null,200,true,"post uploaded successfully")

    } catch (error) {
        return responder(res,null,500,false,`${error.message}`)
        // console.log(error)
    }
}


export {updateBioOrLocation ,uploadPost}