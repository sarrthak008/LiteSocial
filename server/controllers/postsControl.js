import responder from "../utils/responder.js"
import uploadToImageKit from "../utils/uploadToImgKit.js"
import User from "../models/user.model.js"
import Posts from "../models/post.model.js"

const uploadrpofile = async (req, res) => {

   try {
      if (!req._id || !req.file) {
         return responder(res, null, 400, false, "something went wrong")
      } else {
         let url = await uploadToImageKit(req.file)
         let findedUser = await User.findById(req._id);
         findedUser.user_info.userProfile = url
         await findedUser.save()
         return responder(res, null, 200, true, "profile updated successfully")
      }

   } catch (error) {
      return responder(res, null, 500, false, `${error.message}`)
   }
}


const likepost = async (req, res) => {
   try {
      if (!req._id) {
         return responder(res, null, 400, false, "something went wrong1")
      }

      if (!req.params.postid) {
         return responder(res, null, 400, false, "something went wrong2")
      }

      let findedPost = await Posts.findById(req.params.postid).populate("createdBy");

      if (findedPost.likes.includes(req._id)) {
         findedPost.likes.splice(findedPost.likes.indexOf(req._id), 1)
         await findedPost.save()
      } else {

         findedPost.likes.push(req._id)

         await findedPost.save()

         let findedUser = await User.findById(findedPost.createdBy._id);

         let likedBy = await User.findById(req._id)

         findedUser.notifications.push({
            text: `${likedBy.name} liked your post`
         })
         await findedUser.save()
      }

      return responder(res, null, 200, true, "opration done successfully")

   } catch (error) {
      return responder(res, null, 500, false, `${error.message}`)
   }
}

const comment = async(req,res)=>{
   try {
      
      if(!req._id){
         return responder(res,null,400,false,"something went wrong")
      }

      if(!req.params.postid){
         return responder(res,null,400,false,"something went wrong")
      }
      
      if(!req.body.comment){
         return responder(res,null,400,false,"comment is required")

      }

      let findedPost = await Posts.findById(req.params.postid).populate("createdBy");
      
      findedPost.comments.push({
         commentBy:req._id,
         text:req.body.comment
      })

      let postOwner =  await User.findById(findedPost.createdBy._id);
      let commenter = await User.findById(req._id);

      postOwner.notifications.push({
         text:`${commenter.name} commented on your post`
      })

      await findedPost.save()
      await postOwner.save()  

   return responder(res,null,200,true,"comment done successfully")

   } catch (error) {
       return responder(res,null,500,false,`${error.message}`)
   }
}

export { uploadrpofile, likepost ,comment}