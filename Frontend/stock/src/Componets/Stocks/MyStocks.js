import React, { useEffect, useState } from "react";
import Header from "../../Header/Header";
import Footer from "../../Footer/Footer";
import { Link } from "react-router-dom";
import "./MyStocks.css";

const MyStocks = () => {
  const [stocks, setStocks] = useState([]);
  const [quantity, setQuantity] = useState("");
  const [symbol, setSymbol] = useState("");
  const [method, setMethod] = useState(null);

  useEffect(() => {
    //fetch lot data from database
    const fetchTrades = async () => {
      try {
        const response = await fetch("https://stock-exchange-backend.onrender.com/api/v1/Lots");
        if (!response.ok) {
          throw new Error("Failed to fetch trades");
        }
        const data = await response.json();
        setStocks(data.data);
      } catch (error) {
        console.log("api Fetching Error: " + error);
      }
    };

    fetchTrades();
  }, []);

  //To delete lot data from database
  const handleDelete = async (stockId) => {
    try {
      const response = await fetch(
        `https://stock-exchange-backend.onrender.com/api/v1/delete/${stockId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to delete stock");
      }
      window.location.reload();
      setStocks((prevStocks) =>
        prevStocks.filter((stock) => stock.id !== stockId)
      );

      alert("Stock deleted successfully");
    } catch (error) {
      console.error("Error:", error);
      alert("Error occurred while deleting stock");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!quantity || !symbol) {
      alert("Please fill out all the required fields.");
      return;
    }
    const stock = stocks.filter((s) => s.symbol === symbol)[0];

    const realized_amt = stock.price * quantity;

    const remain_amt = stock.amount - realized_amt;

    const remain_qty = stock.quantity - quantity;

    try {
      const response = await fetch("https://stock-exchange-backend.onrender.com/api/v1/sellstock", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          symbol,
          sell_quantity: quantity,
          method: method,
          remain_qty,
          remain_amt,
        }), // Add sell_price if needed
      });
      if (!response.ok) {
        throw new Error("Failed to submit data");
      }
      alert(
        `You successfully sell ${stock.symbol} stocks ,Quantity:${quantity},Total price ${realized_amt}`
      );
      window.location.reload();
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return (
    <>
      <Header />
      <div className="stocks-container">
        <h1>My Stocks</h1>
        <table className="stocks-table">
          <thead>
            <tr>
              <th>Symbol</th>
              <th>Per Price</th>
              <th>Total Price</th>
              <th>Quantity</th>
              <th>Realized</th>
              <th>lot_status</th>
              <th>Actions</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {stocks.map((stock) => (
              <tr key={stock._id}>
                <td>{stock.symbol}</td>
                <td>${stock.price}</td>
                <td>${stock.amount}</td>
                <td>{stock.quantity}</td>
                <td>{stock.realized_quantity}</td>
                <td>{stock.lot_status}</td>
                <td>
                  <Link to="/">
                    <button className="buy-btn">Buy</button>
                  </Link>
                </td>
                <td>
                  <button
                    className="Del-btn"
                    onClick={() => handleDelete(stock._id)}
                  >
                    Del
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="quantity">Quantity:</label>
            <input
              type="text"
              id="quantity"
              placeholder="Enter Quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="symbol">Symbol:</label>
            <input
              type="text"
              id="symbol"
              placeholder="Enter Symbol"
              value={symbol}
              onChange={(e) => setSymbol(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="method">method:</label>
            <select id="method" onChange={(e) => setMethod(e.target.value)}>
              <option value="">Select</option>
              <option value="LIFO">LIFO</option>
              <option value="FIFO">FIFO</option>
            </select>
          </div>
          <button className="buy-btn" type="submit">
            sell
          </button>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default MyStocks;
