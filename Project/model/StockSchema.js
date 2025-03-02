const mongoose=require("mongoose");
const FIFOlotSchema=require("./FIFOlotSchema")
const { v4: uuidv4 } = require("uuid");
const StockSchema=new mongoose.Schema({
trade_id: {
    type: String,
      unique: true,
      default:() => uuidv4(),
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
//Create lots after buying stocks;
StockSchema.post("save", async function (doc, next) {
   const {trade_id,amount,quantity,price,symbol}=doc
   try {
      const lot = await FIFOlotSchema.create({symbol,trade_id,quantity,realized_quantity: 0,realized_trade_id: null,amount,price,lot_status: "OPEN" });

     if (!quantity || !amount ) {
       console.error("All fields are required");
       return next(new Error("All fields are required"));
     };

     console.log("lot Created successfully");
     next(); 
   } catch (error) {
     console.error("Error in post-save middleware:", error);
     next(error);
   }
 });

module.exports= mongoose.model("tradeEntries",StockSchema)