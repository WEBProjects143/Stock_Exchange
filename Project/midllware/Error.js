const ErrorHandler=require("../Utils/ErrorMiddleware");
module.exports=(err,req,res,next)=>{
    console.log("miidleware is running");
    err.message=err.message|| "Internla server error"
    err.statusCode=err.statusCode|| 500

    res.status( err.statusCode).json({msg:`${err.message}`,error:err})
    next()
}