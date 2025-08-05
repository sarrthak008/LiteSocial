import mongoose from "mongoose";



const connectdb = async()=>{

    try {
        
        await mongoose.connect(process.env.MONGO_URL)
        console.log("database connected ↻")

    } catch (error) {
        console.log(`${error}`)
        process.exit(1)
    }
}


export default connectdb