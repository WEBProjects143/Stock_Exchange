const Trademodel=require("../model/StockSchema");
const LOT=require("../model/FIFOlotSchema");

//Insert stock data to the Trademodel database;
exports.CreateTrade=async(req,res)=>{
const {name,symbol,price,broker,quantity,amount}=req.body;
const user=await Trademodel.create({name,symbol,quantity,broker,price,amount});
if (!name || !symbol || !price || !broker || !quantity) {
    return res.status(400).json({
      success: false,
      msg: "All fields are required",
    });
  }
res.status(201).json({
    sucess:true,
    msg:"data submitted  successfully",
    user
})
};

//Fetch lot data;
exports.getdata=async (req, res) => {
    try {
      const trades = await LOT.find();
      res.status(200).json({
        success: true,
        data: trades,
      });
    } catch (error) {
      console.error("Error fetching trades:", error);
      res.status(500).json({
        success: false,
        message: "Failed to fetch trades",
        error: error.message,
      });
    }
  };

  //update realized lot data.
  exports.sellstock=async(req,res)=>{
    try {
      const { symbol, sell_quantity, method} = req.body;
  
      if (!symbol || !sell_quantity || !method) {
        return res.status(400).json({ success: false, msg: "All fields are required" });
      }
  
      // Ensure sell_quantity is a valid number
      if (isNaN(sell_quantity)) {
        return res.status(400).json({ success: false, msg: "Invalid sell_quantity" });
      }
      const stockExists = await LOT.findOne({ symbol });
        if (!stockExists) {
          return res.status(404).json({ success: false, msg: `Stock symbol '${symbol}' not found` });
        }
        const lotqty= await LOT.find({ symbol, lot_status: { $ne: "FULLY REALIZED" } })

        if (lotqty.length === 0) {
          return res.status(404).json({ success: false, msg: `Stock symbol '${symbol}' not found or fully realized.` });
        }
        const totalAvailableStock = lotqty.reduce((total, lot) => total + (lot.quantity - lot.realized_quantity), 0);
        
        if (sell_quantity > totalAvailableStock) {
          return res.status(400).json({
            success: false,
            msg: `Not enough stock available. You have ${totalAvailableStock} available but tried to sell ${sell_quantity}.`
          });
        }
      let remaining_quantity = parseFloat(sell_quantity); // Convert to number
  
      let lots; //Initialize lots variable 
      if (method === "FIFO") {
        lots = await LOT.find({ symbol, lot_status: { $ne: "FULLY REALIZED" } })// FIFO: Sort by createdAt
          .sort({ createdAt: 1 });
      } else if (method === "LIFO") {

        lots = await LOT.find({ symbol, lot_status: { $ne: "FULLY REALIZED" } })// LIFO: Sort by createdAt
          .sort({ createdAt: -1 });
      } else {
        return res.status(400).json({ success: false, msg: "Invalid method" });
      }
      for (const lot of lots) {
        if (remaining_quantity <= 0) break;
        // Calculate available quantity in the lot
        const available_quantity = lot.quantity - lot.realized_quantity;
  
        if (available_quantity <= 0) continue;

        const used_quantity = Math.min(remaining_quantity, available_quantity);

        lot.realized_quantity += used_quantity;
        remaining_quantity -= used_quantity;

        
            if (lot.realized_quantity === lot.quantity) {
              lot.lot_status = "FULLY REALIZED"; 
          } else if (lot.realized_quantity > 0) {
              lot.lot_status = "PARTIALLY REALIZED";
          } else {
              lot.lot_status = "OPEN";
          }
  
        await lot.save();
      }
      if (remaining_quantity > 0) {
        return res.status(400).json({ success: false, msg: "Not enough stock to sell" });
      }
  
      res.status(200).json({ success: true, msg: `Stock sold using ${method} method` });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, msg: "Server error" });
    }
  };
  
  //Delete  lot data.
  exports.Delete=async(req,res)=>{
    try {
   
      const { id } = req.params; 
      const result = await LOT.findByIdAndDelete(id);
  
      if (!result) {
        return res.status(404).json({ success: false, msg: "Lot not found" });
      }
  
      res.status(200).json({ success: true, msg: "Lot deleted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, msg: "Server error" });
    }
  }