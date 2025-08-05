import responder from "../utils/responder.js"
import jwt from "jsonwebtoken"

const verifyJwt =async (req,res,next)=>{
    try {
         if(!(req.session.token)){
            return responder(res,null,400,false,"please login first")
            
        }else{
            let {token} = req.session
            let data = await jwt.verify(token,process.env.JWT_SECRECT)

            if(!data){
                return responder(res,null,400,false,"please login first")
            }else{
                req._id = data._id
                req.email = data.email
                req.user_name = data.user_name
                next()
            }
        }

    } catch (error) {
        
    }
}


export {verifyJwt}