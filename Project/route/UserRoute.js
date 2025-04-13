const express=require("express");
const router=express.Router();
const {Authorize,authorizerole} =require("../midllware/Authenticate");
const {register,login,getAllUser,Logout,ForgetPassword,UpdatePassword,userUpdate,sessionCheck}=require("../Controller/MonogoUser");

router.route("/Register").post(register);
router.route("/getAll").get(Authorize,authorizerole("admin"),getAllUser);
router.route("/Login").post(login);
router.route("/Logout").post(Logout);
router.route("/forgetpassword").post(Authorize,ForgetPassword);
router.route("/password/update").post(Authorize,UpdatePassword);
router.route("/update/userupdate").put(Authorize,userUpdate);
router.route("/session").get(sessionCheck);


module.exports=router;