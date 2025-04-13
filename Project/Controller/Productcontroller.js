const productModel=require("../model/productModel")

//create product --admin
const  createProduct=async(req,res,next)=>{
        const product=  await productModel.create(req.body);
        res.status(200).json({sucess:true,product})
    }
//get all products
const  getAllProduct=async(req,res,next)=>{    
           const getproduct=  await productModel.find();
            res.status(200).json({sucess:true,getproduct})
        } 
//get all products by Id
const  getProductById=async(req,res)=>{
    try {
       const getproduct=  await productModel.findById(req.params.id);
       if(!getproduct){
        return res.status(404).json({msg:"Product not found"})
       }
        res.status(200).json({sucess:true,getproduct})
    } catch (error) {
        console.log(error)
        res.status(404).json({
            success:"false",
            msg:"somthing went wrong"
            
        })
    }
}
//delete product
const deleteProduct=async(req,res,next)=>{
    try {
       const getproduct=  await productModel.findByIdAndDelete(req.params.id);
        res.status(200).json({sucess:true,getproduct,msg:"Product sucessfully deleted"})
    } catch (error) {
        console.log(error)
        res.status(404).json({
            success:"false",
            msg:"somthing went wrong"
            
        })
    }
}
//update product
const updateProduct=async(req,res,next)=>{
    try {
        const product=await productModel.findByIdAndUpdate(req.params.id)
        if(product){
       const getproduct=  await productModel.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
        runValidators:true,
        useFindAndModify:false
       });
        res.status(200).json({sucess:true,getproduct,msg:"Product sucessfully deleted"})
    }else{
        res.status(404).json({
            success:"false",
            msg:"Product Not found"
            
        })
    }
    } catch (error) {
        console.log(error)
        res.status(404).json({
            success:"false",
            msg:"somthing went wrong"
            
        })
    }
}

//Creating reviews
const createReview=async(req,res)=>{
    const {id,name}=req.user;
    const {rating,comment,productID}=req.body;
    const review={
        user:id,
        name:name,
        rating:Number(rating),
        comment:comment
    }
   const product=await productModel.findById(productID)
   console.log(product);
   if(!product){
    return res.status(404).json({success:true,msg:"Product not found"})
   }
   const Reviewd=  product.reviews.some((rev)=>rev.user && rev.user.toString()===id.toString());

    if(Reviewd){    
        product.reviews.forEach(rev=>{
            if(rev.user.toString()==id.toString()){
                rev.rating=rating
                rev.comment=comment
            }
        })
   }else{
    console.log(review)
    product.reviews.push(review)
    product.numOfReview=product.reviews.length;
   }
   product.rating=product.reviews.reduce((sum, rev) => sum + rev.rating, 0) / product.reviews.length;

    await product.save().then().catch(err=>{
        console.log(err)
    });
    return res.status(200).json({success:true,msg:"Review added",product})

}

const getAllReview=async(req,res)=>{
const product=await productModel.findById(req.params.id)
if(!product){
    return res.status(404).json({msg:"Product not found"})
}
res.status(404).json({success:true, reviews:product})

}
const deleteReview=async(req,res)=>{
    const product=await productModel.findById(req.query.productId)
    if(!product){
        return res.status(404).json({msg:"Product not found"})
    }
    const reviews=product.reviews.filter(rev=>rev._id.toString()!==req.query.id.toString())
    const rating =reviews.reduce((sum, rev) => sum + rev.rating, 0)/reviews.length||0
    const numOfReview=reviews.length

    await productModel.findByIdAndUpdate(req.query.productId,{reviews,rating,numOfReview},{new:true,runvalidators:true,useFindAndModify:false})

    res.status(404).json({success:true,product})
    
}

module.exports={
    getAllProduct,createProduct,
    getProductById,deleteProduct,
    updateProduct,createReview,
    deleteReview,getAllReview
}