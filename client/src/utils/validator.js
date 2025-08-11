const validSignup = (name, username, email, password) => {
    if (name.length === 0) {
        return {
            message: "name is required",
            success: false
        };
    } else if (username.length === 0 || username.length < 5) {
        return {
            message: "username must be at least 5 characters long",
            success: false
        };
    } else if (email.length === 0 || email.includes("@") === false) {
        return {
            message: "please enter a valid email",
            success: false
        };
    } else if (password.length === 0 || password.length < 5) {
        return {
            message: "password must be at least 5 characters long",
            success: false
        };
    }else{
        return {
            message: "loooks good signingup..",
            success: true
        };
    }
};

export { validSignup };
