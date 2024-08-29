import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { urlencoded } from "express";
import dotenv from "dotenv";
import connectDB from "./util/db.js";

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
app.listen(PORT,()=>{
    connectDB();
    console.log(`Server listen at port ${PORT}`);
})