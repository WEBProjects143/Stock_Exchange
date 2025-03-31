import React, { useEffect, useState } from "react";
import Header from "../../Header/Header";
import Footer from "../../Footer/Footer";

import "./StockTrade.css";

const TradeStocks = () => {
  const [stocks, setStocks] = useState([]);
  const [quantity, setQuantity] = useState();
   const [method, setMethod] = useState("FIFO");


  useEffect(() => {
    // Fetch trade data from database
    const fetchTrades = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/v1/getTrades");
        if (!response.ok) {
          throw new Error("Failed to fetch trades");
        }
        const result = await response.json();
        setStocks(result.data);
      } catch (error) {
        console.log("API Fetching Error: " + error);
      }
    };

    fetchTrades();
  }, []);

  const handleQuantity=async(e)=>{
    e.preventDefault();
    setQuantity(e.target.value)
  }

  const handleSubmit = async (tradeid) => {

    const stock = stocks.find((s) => s.trade_id === tradeid);// Find the selected stock
    const stockDetails = {
        trade_id:stock.trade_id,
        userId:"67c464ff0c0f6bb2165e93c8",
        name: stock.stock_name,
        symbol: stock.symbol,
        price: stock.price,
        broker: stock.broker_name,
        quantity: -quantity,
        amount: (stock.price * -quantity ).toFixed(2),
        method:method
    }
    try {
      const response = await fetch("http://localhost:5000/api/v1/sellstock", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body:JSON.stringify(stockDetails)
      });
      if (!response.ok) {
        throw new Error("Failed to submit data");
      }else{
        window.location.reload();
      }
     
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return (
    <>
      <Header />
      <div className="stocks-container">
        <h1>Purchased Trades</h1>
        <table className="stocks-table">
          <thead>
            <tr>
              <th>Symbol</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total Amount</th>
              <th>broker_name</th>
              <th>Actions
                <select id="method" onChange={(e) => setMethod(e.target.value)}>
                  <option value="">Select</option>
                  <option value="LIFO">LIFO</option>
                  <option value="FIFO">FIFO</option>
                </select>
              </th>
            </tr>
          </thead>
          <tbody>
            {stocks.length > 0 ? (
              stocks.map((stock) => (
                <tr key={stock.trade_id}>
                  <td>{stock.symbol}</td>
                  <td>${stock.price}</td>
                  <td>{stock.quantity}</td>
                  <td>${stock.amount}</td>
                  <td>{stock.broker_name}</td>                
                  <td>
                  <select className="method-dropdown"onChange={(e) => handleQuantity(e)}
                >
                  <option value="">Quantity</option>
                  <option value="10">10</option>
                  <option value="20">20</option>
                  <option value="30">30</option>
                  <option value="40">40</option>
                  <option value="50">50</option>
                  <option value="70">70</option>
                  <option value="100">100</option>
                  <option value="200">200</option>
                </select>
                  <button className="buy-btn" onClick={()=>handleSubmit(stock.trade_id)}>Sell </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6">No trade data available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <Footer />
    </>
  );
};

export default TradeStocks;
