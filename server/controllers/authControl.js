import responder from "../utils/responder.js"
import User from "../models/user.model.js";
import bcrypt from "bcrypt"

const signup = async (req, res) => {
    try {
        console.log(req.body)
        let { name, email, password, user_name } = req.body
        let requiredData = ["name", "email", "password", "user_name"];

        // checks the required data avaliable in req body...
        requiredData.forEach((data) => {
            if (!(req.body[data])) {
                return responder(res, null, 400, false, `${data} is required`)
            }
        })

        let alreadyExist = await User.findOne({ email })

        if (alreadyExist) {
            return responder(res, null, 400, false, "user already exist with this email");
        }

        let userNameExist = await User.findOne({ user_name })

        if (userNameExist) {
            return responder(res, null, 400, false, "user name already taken");
        }

        let hashPasswrod = await bcrypt.hash(password, 10);

        let createdUser = await User.create({
            name,
            email,
            password: hashPasswrod,
            user_name
        })

        let savedUser = await createdUser.save();

        if (!savedUser) {
            return responder(res, null, 400, false, "something went wrong")
        }

        return responder(res, null, 200, true, "account create successfully")



    } catch (error) {
        return responder(res, null, 500, false, `${error}`)
    }
}


export { signup }