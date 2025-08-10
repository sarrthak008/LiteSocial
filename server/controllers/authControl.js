import responder from "../utils/responder.js"
import User from "../models/user.model.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";

const signup = async (req, res) => {
    try {
        // console.log(req.body)
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

const login = async (req, res) => {

    try {
        let { email, password } = req.body;

        if (!email || !password) {
            return responder(res, null, 400, false, "Email and password are required");
        }


        let foundedUser = await User.findOne({ email });

        if (!foundedUser) {
            return responder(res, null, 400, false, "user not found")
        }

        let isPassMathch = await bcrypt.compare(password, foundedUser.password);

        if (!isPassMathch) {
            return responder(res, null, 400, false, "invalid credentials")
        }

        let token = jwt.sign({
            _id: foundedUser._id,
            email: foundedUser.email,
            user_name: foundedUser.user_name
        }, process.env.JWT_SECRECT)

        req.session.token = token // storing token on the session .....
        return responder(res, {
            _id: foundedUser._id,
            email: foundedUser.email,
            user_name: foundedUser.user_name,
        }, 200, true, "login successfully")

    } catch (error) {
        return responder(res, null, 500, false, `${error.message}`)
    }
}



export { signup, login }