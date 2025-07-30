import express from "express"
import { config } from "dotenv";
config()


const PORT = 3000 || process.env.PORT
const app = express();

//millderwares

app.use(express.json())
app.use(express.urlencoded({extended:true}))

//config..
import connectdb from "./config/connectdb.js";


// controllers
import { signup } from "./controllers/authControl.js";

app.post("/signup",signup)

app.listen(PORT,()=>{
    console.log(`server listen on the port ${PORT}`);
    connectdb()
})

