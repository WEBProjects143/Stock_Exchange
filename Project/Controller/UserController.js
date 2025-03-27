const {response}=require("../Utils/REs");
const sqlDB=require("../Db/Mysqldb");
const UserDb = require("../Db/Mysqldb");


//New user registration
exports.UseRegistration=(req,res)=>{
  const {username,email,password,confirmPassword}=req.body
  const  finduserQuery=`SELECT * FROM registration where email=?`;
  const userdetails=[email];

  sqlDB.query(finduserQuery,userdetails,(err,result)=>{
    if(err){
      console.log(err)
    }
    if(result.length>0){
      return response(res,false,400,"User already exist")
    }
    if(password != confirmPassword){
      return response(res,false,500,"Password do not match") 
    }
    const insertquery=`INSERT INTO registration(username,email,password)VALUES(?,?,?)`;
    const insertvalues=[username,email,password];
    sqlDB.query(insertquery,insertvalues,(err,result)=>{
      if(err){
        console.log(err)
      }
      console.log("Registration done!" + result)
      return response(res,true,200,"Register successfully")
    });
        
    });
};

//login 
exports.UserLogin=(req,res)=>{
  const{email,password}=req.body;

  const loginQuery=`SELECT * FROM registration where email=? and password=?`;
  const logiData=[email,password];
  if(!email || !password){
    console.log("Please enter password")
    return response(res,false,400,"Please enter emial and password")
  }else{
    sqlDB.query(loginQuery,logiData,(err,result)=>{
      if(err){
        return response(res,false,500,"Internal Server Error",err)
      }
      if(result.length==0){
        return response(res,false,404,"User not found") 
      }
      // else{ 
        res.cookie("loggedln","true",{
          httpOnly: true,  // Prevent JavaScript from accessing the cookie
          secure: false,    // Ensure cookie is only sent over HTTPS
          sameSite: 'None', // Allow cross-origin requests
          path: 'http://localhost:3000',
        });
        return response(res,true,200,"User logged in successfully");
      }
    )
    // });
  }

}


