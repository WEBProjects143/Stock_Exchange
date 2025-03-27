require('dotenv').config()
const express=require("express");
const cors=require("cors")
const cookieParser = require('cookie-parser');
const {CreateTrade,getdata,sellstock,getTrades}=require("./Controller/Trade");
const {UseRegistration,UserLogin}=require("./Controller/UserController")
const app=express();

//Middleware
const corsOption={"origin": process.env.ReactURL, "methods": "GET,HEAD,PUT,PATCH,POST,DELETE", credentials: true}
app.use(cors(corsOption));
app.use(express.json())
app.use(cookieParser());

//Routing
app.post("/api/v1/stocks",(req,res)=>{
    const response= req.body
    res.status(200).json({data:response})
})
app.get("/api/v1/Lots",getdata )
app.post("/api/v1/create",CreateTrade)
app.get("/api/v1/getTrades",getTrades)
app.post("/api/v1/sellstock",sellstock)
app.post("/api/v1/Register",UseRegistration)
app.post("/api/v1/Login",UserLogin)
// app.delete("/api/v1/delete/:id",Delete)

//Mongoose routing
const mongoRoute=require("./route/UserRoute");
const productRoute=require("./route/productRoute");
app.use("/api/v2/",mongoRoute);
app.use("/api/v1/",productRoute);



//Mongodb connection
const DBConnection=require("./Db/Db");
const {connectDb}=require("./Db/Pg")
const sqlDB=require("./Db/Mysqldb");

app.listen(5000,async()=>{
    await DBConnection();
    await connectDb();
    await sqlDB;
    console.log("Server created.....")
})
