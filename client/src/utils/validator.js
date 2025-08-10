import { data } from "react-router-dom";

const validSignup = (name, username, email, password) => {

    if (name.lenght == 0) {
        return ({
            message: "name is required",
            success: false
        })
    } else if (username.lenght == 0 || username.lenght < 5) {
        return ({
            message: "username must be atleast 5 characters long",
            success: false
        })
    }else  if (email.lenght == 0 || email.includes("@") == false) {
        return ({
            message: "please select a valid email",
            success: false
        })

    }else if (password.lenght == 0 || password.lenght < 5) {
        return ({
            message: "password must be atleast 5 characters long",
            success: false
        })
    }

}

export { validSignup };