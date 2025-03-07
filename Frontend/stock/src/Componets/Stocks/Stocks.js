"use client";
import React, { useState} from "react";
import "./Stocks.css";

const Stocks = () => {
  const stockData = [
    { id: 1, symbol: "AAPL", name: "Apple Inc.", price: 150.25, change: "+1.5%", marketCap: "2.5T", broker: "Morgan Stanley" },
    { id: 2, symbol: "MSFT", name: "Microsoft Corp.", price: 320.15, change: "-0.8%", marketCap: "2.3T", broker: "Goldman Sachs" },
    { id: 3, symbol: "GOOGL", name: "Alphabet Inc.", price: 2800.45, change: "+2.1%", marketCap: "1.8T", broker: "J.P. Morgan" },
    { id: 4, symbol: "AMZN", name: "Amazon.com Inc.", price: 3450.75, change: "-1.2%", marketCap: "1.6T", broker: "Charles Schwab" },
    { id: 5, symbol: "TSLA", name: "Tesla Inc.", price: 900.50, change: "+0.5%", marketCap: "900B", broker: "Robinhood" },
    { id: 6, symbol: "NFLX", name: "Netflix Inc.", price: 450.20, change: "-2.3%", marketCap: "200B", broker: "Fidelity" },
    { id: 7, symbol: "NVDA", name: "NVIDIA Corp.", price: 720.10, change: "+3.0%", marketCap: "1.1T", broker: "E-Trade" },
    { id: 8, symbol: "FB", name: "Meta Platforms Inc.", price: 365.40, change: "+1.8%", marketCap: "950B", broker: "TD Ameritrade" },
    { id: 9, symbol: "BRK.A", name: "Berkshire Hathaway Inc.", price: 475000.00, change: "+0.2%", marketCap: "700B", broker: "Wells Fargo" },
    { id: 10, symbol: "V", name: "Visa Inc.", price: 210.80, change: "-0.5%", marketCap: "500B", broker: "Bank of America" }
  ];

  const [stocks] = useState(stockData);
  const [data, setData] = useState({}); 

  const handleQuantity = (stockId, e) => {
    setData((prev) => ({
      ...prev,
      [stockId]: { ...prev[stockId], quantity: e.target.value },
    }));
  };

  const handleSubmit = async (stockId) => {
    const stock = stocks.find((s) => s.id === stockId); // Find the selected stock
    const stockDetails = {
      userId:"67c464ff0c0f6bb2165e93c8",
      id: stock.id,
      name: stock.name,
      symbol: stock.symbol,
      price: stock.price,
      broker: stock.broker,
      quantity: data[stockId]?.quantity || 1,
      amount: (stock.price * (data[stockId]?.quantity || 1)).toFixed(2)
    }

    try {
      const response = await fetch("https://stock-exchange-backend.onrender.com/api/v1/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(stockDetails),
      });

      if (!response.ok) {
        throw new Error("Failed to submit data");
      }
      const amount = stockDetails.price * stockDetails.quantity;
      alert(`You successfully purchased ${stockDetails.name} stocks Total price ${amount.toFixed(2)}`)

      const result = await response.json();
      console.log("Data submitted successfully:", result);
      setData((prev) => {
        const newData = { ...prev };
        delete newData[stockId]; // Remove the stock data
        return newData;
      });
       window.location.href = "/Mystocks"
    } catch (error) {
      console.error("Error sending data:", error);
    }
  };

  return (
    <div className="home">
      <h1>Stock Trading Portal</h1>
      <table className="stock-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Symbol</th>
            <th>Price</th>
            <th>Broker</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {stocks.map((stock) => (
            <tr key={stock.id}>
              <td>{stock.name}</td>
              <td>{stock.symbol}</td>
              <td>${stock.price}</td>
              <td>{stock.broker}</td>
              <td>
                <select
                  className="method-dropdown"
                  onChange={(e) => handleQuantity(stock.id, e)}
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
                <button className="buy-button" onClick={() => handleSubmit(stock.id)}>
                  Buy
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Stocks;
