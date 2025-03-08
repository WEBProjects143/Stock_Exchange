require('dotenv').config()
const express=require("express");
const cors=require("cors")
const {CreateTrade,getdata,sellstock,getTrades}=require("./Controller/Trade")
const app=express();

//Middleware
const corsOption={"origin": process.env.ReactURL, "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",credentials: true}
app.use(cors(corsOption));
app.use(express.json())

//Routing
app.post("/api/v1/stocks",(req,res)=>{
    const response= req.body
    console.log(response)
    res.status(200).json({data:response})
})
app.get("/api/v1/Lots",getdata )
app.post("/api/v1/create",CreateTrade)
app.get("/api/v1/getTrades",getTrades)
app.post("/api/v1/sellstock",sellstock)
// app.delete("/api/v1/delete/:id",Delete)

//Mongodb connection
const DBConnection=require("./Db/Db");
const {connectDb}=require("./Db/Pg")

app.listen(5000,async()=>{
    await DBConnection();
    await connectDb();
    console.log("Server created.....")
})
