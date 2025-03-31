const {Authorize,authorizerole}=require("../midllware/Authenticate");
const {newOrder,getAllOrders,getsingleOrder,adminOrders,DeleteOrder,Updateorders} =require("../Controller/orderController")
const express=require("express");
const router=express.Router();
router.route("/newOrder").post(Authorize, newOrder)
router.route("/getSinfgleOrder/:id").post(Authorize, getsingleOrder)
router.route("/allOrder").get(Authorize, getAllOrders)
router.route("/Orders").get(Authorize,authorizerole, adminOrders)
router.route("/orderupdate/:id").put(Authorize, Updateorders).delete(Authorize, DeleteOrder)

module.exports=router