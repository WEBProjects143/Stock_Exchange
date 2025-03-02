require('dotenv').config()
const mongoose=require("mongoose");
const DBConnection=()=>{
    mongoose.connect(process.env.URL).then(()=>{
        console.log("db is connected......")
    }).catch((error)=>{
        console.log(error)
    })
}
module.exports=DBConnection;