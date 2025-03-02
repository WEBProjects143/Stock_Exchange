require('dotenv').config()
const express=require("express");
const cors=require("cors")
const {CreateTrade,getdata,sellstock,Delete}=require("./Controller/Trade")
const app=express();

//Middleware
const corsOption={"origin": "https://stock-exchange-frontend.onrender.com", "methods": "GET,HEAD,PUT,PATCH,POST,DELETE","preflightContinue": false,"optionsSuccessStatus": 204}
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
app.post("/api/v1/sellstock",sellstock)
app.delete("/api/v1/delete/:id",Delete)

//Mongodb connection
const DBConnection=require("./Db/Db");

app.listen(5000,async()=>{
    DBConnection();
    console.log("Server created.....")
})
