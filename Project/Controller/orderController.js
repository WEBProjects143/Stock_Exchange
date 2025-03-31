const orderModel=require("../model/OrderModel");
const ProductModel=require("../model/productModel");
const { validate } = require("../model/UserSchema");

exports.newOrder=async(req,res)=>{
    const {shippingInfo,
        orderItems,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice
    }=req.body

    const order =await orderModel.create({
        shippingInfo,
        orderItems,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paidAt:Date.now(),
        user:req.user.id
    })
    if(!order){
        return res.status(404).json({success:false,msg:"Somthing went wrong"})
    }
    return res.status(200).json({success:true,msg:"Your order Created Successfully", order})
    
}
//get single order
exports.getsingleOrder=async(req,res)=>{

    const order =await orderModel.findById(req.params.id).populate("user","name emial")

    if(!order){
        return res.status(404).json({success:false,msg:"order not found"})
    }
    return res.status(200).json({success:true,msg:"Your order Created Successfully", order})
    
}

// get all orders
exports.getAllOrders=async(req,res)=>{
    const orders =await orderModel.find({user:req.user.id})
    return res.status(200).json({success:true, orders})
    
}
exports.adminOrders=async(req,res)=>{
    const orders =await orderModel.find()
    return res.status(200).json({success:true,orders})
    
}
//UpdateOrders
exports.Updateorders=async(req,res)=>{

    const order =await orderModel.findById(req.params.id)

    if(!order){
        return res.status(404).json({success:false,msg:"order not found"})
    }
    order.orderItems.forEach(async(order)=>{
        await UpdateStocks(order._id,order.quantity)
    })
    order.orderStatus=req.body.status;
    if(order.orderStatus=="Delivered"){
        order.deliveredAt=Date.now();
    }
    order.save({validateBeforeSave:false})
    return res.status(200).json({success:true,msg:"Your order updated Successfully", order})
    
}
 async function UpdateStocks(id, quantity){
     const product =await ProductModel.findById(id);
     product.stock-=quantity
     product.save({validateBeforeSave:false})
 }

 //Deleteorder
 exports.DeleteOrder=async(req,res)=>{

    const order =await orderModel.findByIdAndDelete(req.params.id)

    if(!order){
        return res.status(404).json({success:false,msg:"order not found"})
    }
    return res.status(200).json({success:true,msg:" Order deleted Successfully", order})
    
}