const {client} = require("../Db/Pg")

//Insert stock data to the Trademodel database;
exports.CreateTrade=async(req,res)=>{
const {userId,name,symbol,price,broker,quantity}=req.body;
if (!name || !symbol || !price || !broker || !quantity) {
  return res.status(400).json({
    success: false,
    msg: "All fields are required",
  });
}
  const insertTradeQuery = `
  INSERT INTO trade (stock_name, quantity, broker_name, price,user_id,symbol)
  VALUES ($1, $2, $3, $4, $5, $6)
  RETURNING *;
  `;
  const tradeValues = [ name,Number(quantity),broker,price,userId,symbol];
  const tradeRes = await client.query(insertTradeQuery, tradeValues);

  const lotQuery = `INSERT INTO lot (trade_id, lot_quantity, realized_quantity, realized_trade_id, lot_status, user_id,symbol)
    VALUES ($1, $2, $3, $4, $5, $6,$7)
    RETURNING *;
`;
  const lotValues = [ tradeRes.rows[0].trade_id,tradeRes.rows[0].quantity,0,null,'OPEN',tradeRes.rows[0].user_id,tradeRes.rows[0].symbol];
  const lotRes = await client.query(lotQuery, lotValues);
console.log(tradeRes.rows[0].trade_id)
res.status(201).json({
    sucess:true,
    msg:"data submitted  successfully",
    tradeRes,
    lotRes
})
};

//Fetch lot data;
exports.getdata=async (req, res) => {
    try {
      const selectQuery = 'SELECT * FROM lot';
      const result = await client.query(selectQuery);
     const data=result.rows
     console.log(data)

      res.status(200).json({
        success: true,
        message: "successfull fetch Lot data",
        data    
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

//Fetch trade data;
 exports.getTrades=async (req, res) => {
    try {
      const selectQuery = 'SELECT * FROM trade';
      const result = await client.query(selectQuery);
     const data=result.rows

      res.status(200).json({
        success: true,
        message: "successfull fetch Lot data",
        data    
      });
    } catch (error) {
      console.error("Error fetching trades:", error);
      res.status(500).json({
        success: false,
        message: "Failed to fetch trades",
        error: error.message,
      });
    }
  }
  
  //Sell realized lot data.
  exports.sellstock = async (req, res) => {
    try {
      const { trade_id, name, quantity, broker, price, userId, symbol,method } = req.body;

      const lotsellcheck = `
      SELECT * FROM lot
      WHERE symbol = $1 
      ORDER BY timestamp DESC;
    `;
    const lotValues = [symbol];
    const reslot = await client.query(lotsellcheck, lotValues);
    const lotcheck = reslot.rows[0];

    

    // checking lot status
    if(lotcheck.lot_quantity===lotcheck.realized_quantity){
      
      res.status(500).json({ success: false, msg: "Data not inserted" });
    }else{ 
    //  Insert the trade record after lot updates
      const insertTradeQuery = `
        INSERT INTO trade (stock_name, quantity, broker_name, price, user_id, symbol)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING *;
      `;
      const seltradeValues = [name, Number(quantity), broker, price, userId, symbol];
      const seleRes = await client.query(insertTradeQuery, seltradeValues);
  
      res.status(200).json({ success: true, msg: 'Sold successfully' });
    }
  
      let lotsellquery;
     // query for LIFO AND FIFO
    if (method === 'LIFO') {
      lotsellquery = `
        SELECT * FROM lot
        WHERE symbol = $1 AND lot_status IN ('OPEN', 'PARTIALLY REALIZED')
        ORDER BY timestamp DESC
      `;
    } else if (method === 'FIFO') {
      lotsellquery = `
        SELECT * FROM lot
        WHERE symbol = $1 AND lot_status IN ('OPEN', 'PARTIALLY REALIZED')
        ORDER BY timestamp ASC
      `;
    } else {
      return res.status(400).json({
        success: false,
        error:error,
        msg: "Invalid method specified. Use 'LIFO' or 'FIFO'."
      });
    }

    const sellotValues = [symbol];
    const lotRes = await client.query(lotsellquery, sellotValues);
    const lotval = lotRes.rows;
  
      //  Handle remaining quantity to sell 
      let remainingQuantity = Number(quantity) * -1;
  
      let isError = false;
  
      for (let i = 0; i < lotval.length; i++) {
        const lot = lotval[i];
  
        // Check if the lot is fully realized 
        if (lot.lot_status === 'FULLY REALIZED') {
          // Log the alert and mark as error
          console.log(`ALERT: Lot ${lot.lot_id} is fully realized. Cannot sell from it.`);
          isError = true;
  
          return res.status(400).json({
            success: false,
            msg: `Lot ${lot.lot_id} is fully realized. You cannot sell from it.`
          });
        }else{
  
        const availableQuantity = lot.lot_quantity - lot.realized_quantity;
  
        //  if remaining quantity exceeds available quantity
        if (remainingQuantity > availableQuantity) {
          console.log(`ALERT: Attempt to sell more than available in Lot ${lot.lot_id}. Available: ${availableQuantity}, Attempted to sell: ${remainingQuantity}`);
          isError = true;
  
          return res.status(400).json({
            success: false,
            msg: `Not enough quantity in Lot ${lot.lot_id}. Available: ${availableQuantity}, Attempted to sell: ${remainingQuantity}`
          });
        }
  
        // Calculate the quantity to realize from this lot
        const realizeQuantity = Math.min(availableQuantity, remainingQuantity);
  
        // Update the lot's realized quantity and trade ID
        lot.realized_quantity += realizeQuantity;
        lot.realized_trade_id = trade_id;
  
        // Update the lot status based on realized quantity
        if (lot.realized_quantity === lot.lot_quantity) {
          lot.lot_status = 'FULLY REALIZED';
        } else{
          lot.lot_status = 'PARTIALLY REALIZED';
        } 

        // Decrease remaining quantity
        remainingQuantity -= realizeQuantity;
  
        // Update the lot in the database
        const updateLotQuery = `
          UPDATE lot
          SET realized_quantity = $1, realized_trade_id = $2, lot_status = $3
          WHERE lot_id = $4
          RETURNING *;
        `;
        await client.query(updateLotQuery, [lot.realized_quantity, trade_id, lot.lot_status, lot.lot_id]);
  
        // If remainingQuantity reaches 0, stop the loop
        if (remainingQuantity === 0) {
          break;
        }}
      }
  
      if (isError) {
        return;
      }

     
  
    } catch (error) {
      res.status(500).json({ success: false, msg: "Server error" });
    }
  };
  
  