const mongoose =require("mongoose")
const ProductModel=new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please enter product name"],
        trim:true
    },
    description:{
        type:String,
        required:[true,"Please enter product description"]
    },
    price:{
        type:Number,
        required:[true,"Please enter product price"],
        maxlength:[8,"Price cannot be more than 8 characters"]
    },
    stock:{
        type:Number,
        required:[true,"Please enter product price"],
        default:1
    },
    rating:{
        type:Number,
        default:0
    },
    images:[
        {
            public_id:{
                type:String,
                required:true,
            },
            image_url:{
                type:String,
                required:true,
            },
        },
    ],
    category:{
        type:String,
        required:[true,"Please enter product category"]
    },
    numOfReview:{
        type:Number,
        default:0
    },
    reviews:[
        {
            user:{
                type:mongoose.Schema.ObjectId,
                ref:"regusers",
                // required:true,
            },
            name:{
                type:String,
                required:true
            },
            rating:{
                type:Number,
                required:true,
            },
            comment:{
                type:String,
                required:true,
            },
        },
    ],
    user:{
        type:mongoose.Schema.ObjectId,
        ref:"User",
        // required:true
    },
    createdAt:{
        type:Date,
        default:Date.now()
    }
})
module.exports=mongoose.model("ecomproducts",ProductModel);