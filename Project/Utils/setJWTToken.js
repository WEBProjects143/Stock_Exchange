//creating token


const setToken=(user,statusCode,res)=>{
const token=user.getJWTToken()
 const options={
    httpOnly:true,
    expire:new Date(Date.now()+process.env.cookieExpireIn*24*60 *60*1000)
 }
res.status(statusCode).cookie("token",token,options).json({
    success:true,
    user,
    token
})
}
module.exports=setToken;