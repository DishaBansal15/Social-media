import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { urlencoded } from "express";
import dotenv from "dotenv";
import connectDB from "./util/db.js";
import userRoute from "./routes/user.routes.js";
import postRoute from "./routes/post.route.js";
import messageRoute from "./routes/message.route.js";
dotenv.config({});

const app=express();

const PORT=process.env.PORT || 3000;
app.get("/",(req,res)=>{
    return res.status(200).json({
        message:"I'm coming from backend",
        sucess:true
    })
})
app.use(express.json());
app.use(cookieParser());
app.use(urlencoded({extended:true}));
const cors0ptions={
    origin:'http://localhost:5173',
    credentials:true
}
app.use(cors(cors0ptions));

app.use("/api/v1/user",userRoute);
app.use("/api/v1/user",postRoute);
app.use("/api/v1/user",messageRoute);
"http://localhost:8000/api/v1/user/register"

app.listen(PORT,()=>{
    connectDB();
    console.log(`Server listen at port ${PORT}`);
})