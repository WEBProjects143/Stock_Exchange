const User=require("../model/UserSchema")
const setToken=require("../Utils/setJWTToken");
const {SendEmail}=require("../Utils/SendEmail");

exports.register=async(req,res)=>{
 const{name,email,password}=req.body
 const UserData=await User.create({
    name,email,password,
    avatar:{
        public_Id: "smaple public id ",
        url:"sample URL"
    }
 });
 setToken(UserData,201,res)
}
exports.login=async(req,res)=>{
    const{email,password}=req.body
   
    if( !email || !password){
        return res.status(401).json({success:false,msg:"Invalid email or password"})
    }
    const userlogin=await User.findOne({email:email}).select("+password");

   if(!userlogin){
    return res.status(404).json({success:false,msg:"User not found"})
   }
    
    const confirmPassword=await userlogin.comparePassword(password);
    console.log(confirmPassword)

    if(!confirmPassword){
        return res.status(401).json({success:false,msg:"Invalid email or password"})
    
    }
    req.session.isLoggedIn = true;
    req.session.user =userlogin._id;
  console.log("req.session.user"+ req.session.user)
    setToken(userlogin,200,res)
    
}
exports.getAllUser=async(req,res)=>{
    const users=await User.find();
    if(!users){
      return res.status(404).json({msg:"Users not found"})
    }
    return res.status(200).json({success:true,users})
  
};
  
exports.Logout=(req,res)=> {
  req.session.destroy((err) => {
    if (err) {
      console.log(err);
    }});
    res.cookie("token",null,{
      expires:new Date(Date.now()),
      httpOnly:true
    });
    res.status(200).json({success:true,msg:"User logged out successfully"})
};

module.exports.ForgetPassword=async(req,res)=>{
    const user=await User.findOne({email:req.body.email});

    if(!user){
      return res.status(404).json({sucess:false,msg:"User not found  "});
    }

    const token =await user.getResetToken()
    await user.save({validateBeforeSave:false});

    const resettokenUrl=`${req.protocol}://${req.get("host")}/api/v1/password/reset/${token}`;
    const mesage=`your password reswt token is :-\n\n ${resettokenUrl} \n\n if it not generated by you please ignore.`
    try {

      await SendEmail({
        email:user.email,
        subject:`Ecommerce recovery password`,
        message:mesage
      })
      return res.status(200).json({
        sucess:true,
        msg:`Email sent ${user.email} successfully `
      })
      
    } catch (error) {
      this.resetPassword=null;
      this.resetPasswordExpiration=null;
      await user.save({validateBeforeSave:false})
      console.log(error)
      return res.status(403).json({msg:'Reset password error'})

    }
}

exports.UpdatePassword=async(req,res,next)=>{
const user=await User.findById(req.body.id).select("+password");
if(!user){
  return res.status(404).json({msg:"Users not found"})
}

const comparePassword=await user.comparePassword(req.body.oldpassword);

if(!comparePassword){
  return res.status(401).json({msg:"Old Password is incorrect"})
}

if(req.body.newpassword != req.body.confirmpassword){
  return res.status(401).json({msg:"New password doesnt match not found"})
}
user.password=newpassword;
user.save();

setToken(user,200,res)

}

exports.userUpdate=async(req,res,next)=>{
  const {email,name}=req.body
  const newUserData={
    email,
    name
  }
  const user=await User.findByIdAndUpdate(req.user.id,newUserData,{
    new:true,
    runValidators:true,
    useFindAndModify:false,
  })
  res.status(200).json({msg:"User updated succesfully"})

}
exports.sessionCheck=(req,res)=>{
  if(!req.session.user){
    return res.status(403).json({msg:"User not logged IN"})
  }
  res.status(200).json({user:req.session.user})
}