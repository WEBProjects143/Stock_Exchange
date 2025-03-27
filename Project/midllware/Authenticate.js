const User=require("../model/UserSchema");
const jwtToken=require("jsonwebtoken")

exports.Authorize=async(req,res,next)=>{
    try {
        const {token}= req.cookies;
        if(!token){
            return res.status(401).json({msg:"User logged out"})
        }
        const decode=await jwtToken.verify(token,process.env.JWT_SECRET)
        req.user=await User.findById(decode.id)
        next();
        
    } catch (error) {
       console.log(error)
    }
   

};

exports.authorizerole=(...roles)=>{
return (req,res,next)=>{
    if(!roles.includes(req.user.role)){
        return res.status(403).json({msg :`user role ${req.user.role} is not allowed `} )
    }
    next();
}
}

