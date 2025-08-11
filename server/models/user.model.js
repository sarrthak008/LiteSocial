import { Schema, model } from "mongoose";


const userSchema = new Schema({

    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true
    },

    user_name: {
        type: String,
        required: true,
        unique: true
    },

    user_info: {
        bio: {
            type: String,
            default: "i am user of LiteSocial"
        },
        location: {
            type: String,
        },
        userProfile: {
            type: String,
            default: "https://static.vecteezy.com/system/resources/thumbnails/001/840/618/small/picture-profile-icon-male-icon-human-or-people-sign-and-symbol-free-vector.jpg"
        },
        accountType: {
            type: String,
            default: "public",
            enum: ["public", "private"]
        }
    },
    
    posts: [{
        type: Schema.Types.ObjectId,
        ref: "Posts"
    }],

    followers: [{
        type: Schema.Types.ObjectId,
        ref: "User"
    }]
    ,
    following: [{
        type: Schema.Types.ObjectId,
        ref: "User"
    }],

    notifications: [
        {
            text: {
                type: String,
                required: true
            }
        }
    ],

    requets: [{
        type: Schema.Types.ObjectId,
        ref: "User"
    }],

    liteMoments: [
        {
            type: Schema.Types.ObjectId,
            ref: "LiteMoment"
        }
    ]


})


const User = model("User", userSchema)
export default User