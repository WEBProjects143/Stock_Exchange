
const mongoose=require("mongoose");
const validator=require("validator");
const bcrypt=require("bcrypt")
const jwtToken=require("jsonwebtoken");
const crypto=require("crypto")

const Userschema= new mongoose.Schema({
    name:{
        type:String,
        required:true,
        minLength:[3,"Name sholud be more than 3 characters"]
    },
    email:{
        type:String,
        required:true,
        validate:[validator.isEmail,"Please enter Proper email"]
    },
    password:{
        type:String,
        required:true,
        minLength:[3,"password  sholud be more than 3 characters"],
        select:false
    },
    avatar:{
        public_Id:{
            type:String,
            required:true,
        },
        url:{
            type:String,
            required:true
        }
    },
    role:{
        type:String,
        required:true,
        default:"user"
    },
    resetPassword:String,
    resetPasswordExpiration:Date
})

Userschema.pre('save',async function(next){
    if(!this.isModified("password")){
        next()
    }
    this.password=await bcrypt.hash(this.password,10)
} )
Userschema.methods.getJWTToken= function(){
    return jwtToken.sign({id:this._id},process.env.JWT_SECRET,{
        expiresIn:process.env.EXPIN
    })
};

Userschema.methods.comparePassword= async  function(enteredpass){
    return await bcrypt.compare(enteredpass,this.password)
}

//Genberating reset token

Userschema.methods.getResetToken=async function(){
    //Generating  token
    const resetToken=crypto.randomBytes(20).toString("hex");
    //Hashing and adding  reset password token to userSchema
   this.resetPassword=crypto
   .createHash("sha256")
   .update(resetToken)
   .digest("hex");

   this.resetPasswordExpiration=Date.now()+15*60*100
    return resetToken ;
}
module.exports=mongoose.model("regusers",Userschema)