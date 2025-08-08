import User from "../models/user.model.js"
import responder from "../utils/responder.js"
import uploadToImageKit from "../utils/uploadToImgKit.js"
import Posts from "../models/post.model.js"

const updateBioOrLocation = async (req, res) => {
   try {
      if (!req._id) {
         return responder(res, null, 400, false, "something went wrong")
      }

      let findedUser = await User.findById(req._id)

      if (req?.body?.bio) {
         findedUser.user_info.bio = req.body.bio
         await findedUser.save()
      }
      if (req?.body?.location) {
         findedUser.user_info.location = req.body.location
         await findedUser.save()
      }
      return responder(res, null, 200, true, "updated successfully")


   } catch (error) {
      return responder(res, null, 500, false, `${error.message}`)
   }
}

const uploadPost = async (req, res) => {
   try {
      console.log(req._id, req.file)

      if (!req._id || !req.file) {
         return responder(res, null, 400, false, "something went wrong1")
      }

      let { title, description } = req.body

      if (!req.body.title || !req.body.description) {
         return responder(res, null, 400, false, "title and description is required")
      }


      let findedUser = await User.findById(req._id)
      if (!findedUser) {
         return responder(res, null, 400, false, "user not found")
      }

      let imgurl = await uploadToImageKit(req.file);

      if (!imgurl) {
         return responder(res, null, 400, false, "server is busy please try again later");
      }

      let newPost = await Posts.create({
         title: title,
         description: description,
         image: imgurl
      })

      findedUser.posts.push(newPost?._id);
      await findedUser.save();
      await newPost.save()
      return responder(res, null, 200, true, "post uploaded successfully")

   } catch (error) {
      return responder(res, null, 500, false, `${error.message}`)
      // console.log(error)
   }
}

const loadloginUserInfo = async (req, res) => {
   try {
      if (!req._id) {
         return responder(res, null, 400, false, "something went wrong");
      }
      let findedUser = await User.findById(req._id).select("-password  -__v").populate("posts followers following")
      if (!findedUser) {
         return responder(res, null, 400, false, "user not found")
      } else {
         return responder(res, findedUser, 200, true, "user found")
      }
   } catch (error) {
      return responder(res, null, 500, false, `${error.message}`)
   }
}

const sendfollowRequest = async (req, res) => {
   try {

      if (!req._id) {
         return responder(res, null, 400, false, "something went wrong")

      }
      let { id } = req.params
      if (!id) {
         return responder(res, null, 400, false, "something went wrong")
      }
      let requestedUser = await User.findById(id)
      let requester = await User.findById(req._id)

      if (!requestedUser) {
         return responder(res, null, 400, false, "user not found")
      }

      let alreadyFollow = requestedUser.followers.includes(req._id)

      if (alreadyFollow) {
         return responder(res, null, 400, false, "already follow")
      }

      if (requestedUser.user_info.accountType === "public") {
         requestedUser.followers.push(req._id)
         requestedUser.notifications.push({
            text: `${requester.name} started follow you`
         })
         requester.following.push(id)
         await requestedUser.save()
         await requester.save()
         return responder(res, null, 200, true, "following successfully..")
      }

      if (requestedUser.user_info.accountType === "private") {
         requestedUser.requets.push(req._id)
         requestedUser.notifications.push({
            text: `${requester.name} want to follow you`
         });
         await requestedUser.save()
         return responder(res, null, 200, true, "request sent successfully")
      }

   } catch (error) {
      return responder(res, null, 500, false, `${error.message}`)
   }
}

const acceptorRejectRequest = async (req, res) => {
   try {
      if (!req._id) {
         return responder(res, null, 400, false, "something went wrong 1")
      }
      let { id } = req.params
      let { opration } = req.body
      console.log(opration)

      let requester = await User.findById(id) // kisne request send kii haiii
      let logdInUser = await User.findById(req._id)

      if (!requester) {
         return responder(res, null, 400, false, "user not found")
      }
      if (!logdInUser) {
         return responder(res, null, 400, false, "user not found")
      }

      console.log(logdInUser.requets)

      if (logdInUser.requets.includes(id)) {
         if (opration === "accept") {
            logdInUser.followers.push(id)
            requester.following.push(req._id)
            requester.notifications.push({
               text: `${logdInUser.name} accepted your request`
            })
            await logdInUser.save()
            await requester.save()
            return responder(res, null, 200, true, "request accepted successfully")
         } else if (opration == "reject") {
            logdInUser.requets.splice(logdInUser.requets.indexOf(id), 1)
            await logdInUser.save()
         }
      } else {
         return responder(res, null, 400, false, "something went wrong")
      }

   } catch (error) {
      return responder(res, null, 500, false, `${error.message}`)
   }
}


let getuser = async (req, res) => {

   try {
      let id = req.params.id;
      if (!id) {
         return responder(res, null, 400, false, "something went wrong")
      }
      let findedUser = await User.findById(id).select("-password -__v -notifications -requets ")
      if (!findedUser) {
         return responder(res, null, 400, false, "user not found")
      }
      if (findedUser.user_info.accountType === "private") {

         return responder(res, findedUser, 200, true, "user found")

      } else {

         let publicUser = await User.findById(id).select("-password -__v -notifications -requets ").populate("following", "user_info name user_name _id").populate("followers", "user_info name user_name _id").populate("posts")
         return responder(res, publicUser, 200, true, "user found ")

      }

   } catch (error) {
      return responder(res, null, 500, false, `${error.message}`)
   }

}


export { updateBioOrLocation, uploadPost, loadloginUserInfo, sendfollowRequest, acceptorRejectRequest, getuser }