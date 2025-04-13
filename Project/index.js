require('dotenv').config()
const express=require("express");
const cors=require("cors")
const cookieParser = require('cookie-parser');
const {CreateTrade,getdata,sellstock,getTrades}=require("./Controller/Trade");
const {UseRegistration,UserLogin}=require("./Controller/UserController");
const {Logout}=require("./Controller/MonogoUser");
const AppError=require("./Utils/ErrorMiddleware")
const ErrorMiddleware=require("./midllware/Error")
//setting session
const session=require("express-session");

// const {Apilimitter}=require("./midllware/ApiLimitter")

const app=express();
// app.use(Apilimitter);
//Middleware
const corsOption={"origin":"*", "methods": "GET,HEAD,PUT,PATCH,POST,DELETE", credentials: true}
app.use(cors(corsOption));
app.use(express.json())
app.use(cookieParser());

//session middlware
app.use(session({
    secret:"bhupendra",
    resave:false,//not save session in every request
    saveUninitialized:false,//This option determines whether to save uninitialized sessions
    cookie: { maxAge: 60000 }
}))


//Routing
app.post("/api/v1/stocks",(req,res)=>{
    const response= req.body
    res.status(200).json({data:response})
})


app.get("/fail",(req,res,next)=>{
    // try {
        return next(new AppError("something went wrong",403))        
        // } catch (error) {
            //     next(error)
            // }
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
        const orderRoute=require("./route/orderroute");
        app.use("/api/v2/",mongoRoute);
        app.use("/api/v1/",productRoute);
        app.use("/api/v1/",orderRoute);
        app.use(ErrorMiddleware);
        
//globally handling error
app.use((err,req,res,next)=>{
if(err.name=="ReferenceError"){
    res.status(500).json({msg:"somthing went wrong"})
    process.exit(1)
}
next()
})

//Mongodb connection
const DBConnection=require("./Db/Db");
const {connectDb}=require("./Db/Pg")
const sqlDB=require("./Db/Mysqldb");

app.listen(5000,async(req,res)=>{
    await DBConnection();
    await connectDb();
    await sqlDB;
    console.log("Server created.....")
})

