import express from "express"
import { config } from "dotenv";  /* call the config()*/  config()
import cors from "cors";
import session from "express-session";
import cookieParser from "cookie-parser";

import multer from "multer"
import upload from "./middleware/multer.js";
import fs from "fs";


import imageKitConfig from "./config/imagekitConfig.js"
let imagekit = imageKitConfig();



const PORT = 3000 || process.env.PORT
const app = express();

//millderwares

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(cors({
    origin: [],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true
}))
app.use(cookieParser())
app.use(session({
    secret: process.env.SESSION_SECRECT,
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 24 * 60 * 60 * 1000,
        httpOnly: true
    }
}))

//config..
import connectdb from "./config/connectdb.js";



// controllers
import { signup, login } from "./controllers/authControl.js";
import {uploadrpofile} from "./controllers/postsControl.js"
import {updateBioOrLocation,uploadPost,loadloginUserInfo,sendfollowRequest,acceptorRejectRequest ,getuser} from "./controllers/userActionControl.js"

//middlewares 
import { verifyJwt } from "./middleware/verifyjwt.js";

app.post("/signup", signup);
app.post("/login", login);
app.post("/uploadrpofile",verifyJwt,upload.single("file"),uploadrpofile)
app.post("/updatebioorlocation",verifyJwt,updateBioOrLocation)
app.post("/uploadpost",verifyJwt,upload.single("post"),uploadPost)
app.get("/mydashboard",verifyJwt,loadloginUserInfo)
app.get("/request/:id",verifyJwt,sendfollowRequest)
app.post("/acceptorrejectrequest/:id",verifyJwt,acceptorRejectRequest)
app.get("/getuser/:id",getuser)


app.listen(PORT, () => {
    console.log(`server listen on the port ${PORT}`);
    connectdb()
})

