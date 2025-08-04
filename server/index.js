import express from "express"
import { config } from "dotenv";  /* call the config()*/  config()
import cors from "cors";
import session from "express-session";
import cookieParser from "cookie-parser";


const PORT = 3000 || process.env.PORT
const app = express();

//millderwares

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use(cors({
    origin:[],
    methods:["GET","POST","PUT","DELETE","PATCH"],
    credentials:true
}))
app.use(cookieParser())
app.use(session({
    secret : process.env.SESSION_SECRECT,
    resave:false,
    saveUninitialized:true,
    cookie:{
        maxAge: 24*60*60*1000,
        httpOnly:true
    }
}))

//config..
import connectdb from "./config/connectdb.js";


// controllers
import { signup ,login } from "./controllers/authControl.js";


app.post("/signup",signup);
app.post("/login",login);


app.listen(PORT,()=>{
    console.log(`server listen on the port ${PORT}`);
    connectdb()
})

