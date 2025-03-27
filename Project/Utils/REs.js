module.exports={
    response:(res,success,statusCode,msg,data=null)=>{
        res.status(statusCode).json({
            success:success,
            msg:msg,
            data:data
        })

    }
}