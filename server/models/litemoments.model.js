import { model, Schema } from "mongoose";

const liteMomentsSchmea = new Schema({
    moments_pic: {
        type: String,
        required: true
    },
    caption: {
        type: String,
    },
    addedBy: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
     addAt: {
         type: Date, 
         default: Date.now, 
         expires: 60 * 60 * 24 
    },
    views:[
        {
            type:Schema.Types.ObjectId,
            ref:"User",
            required:true
        }
    ]

})

const LiteMoments = model("LiteMoment", liteMomentsSchmea)

export default LiteMoments;