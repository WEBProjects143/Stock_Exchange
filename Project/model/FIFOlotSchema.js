const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");
const FIFOlotSchema = new mongoose.Schema({
  symbol: { 
    type: String   
 }, 
  lot_id: {
    type: String,
    unique: true,
    default:()=>uuidv4()// Generate random Id
  },
  trade_id: {
    type:String,
    required:true // Generate random Id
  },
  quantity: {
    type: Number,
    required: true,
    min: 0,
  },
  realized_quantity: {
    type: Number,
    default: 0,
    min: 0,
  },
  realized_trade_id: {
    type: String,
    default: null,
  },
  method: {
    type: String,
    required: true,
    default:"FIFO"
    },
    amount: {
      type: Number,
      required: true,
      },
      price: {
        type: Number,
        required: true,
        },
  lot_status: {
    type: String,
    enum: ["OPEN", "PARTIALLY REALIZED", "FULLY REALIZED"],
    default: "OPEN",
  },
  userId: {
    type:String,
    required: true,
  }
}, { timestamps: true });

module.exports = mongoose.model("Lot", FIFOlotSchema);