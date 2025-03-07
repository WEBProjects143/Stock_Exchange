const mongoose=require("mongoose");
const userId="67c464ff0c0f6bb2165e93c8";
const FIFOlotSchema=require("./FIFOlotSchema")
const { v4: uuidv4 } = require("uuid");

const StockSchema=new mongoose.Schema({
  userId:{
    type:String,
    required:true 
  },
  trade_id: {
    type: String,
    unique: true,
    default: () => uuidv4(), // Unique ID for each stock purchase
  },
  name: { 
    type: String,
    required:true
}, 
symbol: { 
   type: String   
}, 
  quantity: { 
    type: Number
 
    }, 
  broker: {
     type: String,

     },
  price: {
     type: Number,
    
     }, 
  amount: {
     type: Number,
   
     }, 
  timestamp: { 
    type: Date,
     default: Date.now 
    } 
});

module.exports= mongoose.model("tradeEntries",StockSchema)