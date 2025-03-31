import React, { useEffect, useState } from "react";
import Header from "../../Header/Header";
import Footer from "../../Footer/Footer";
import { Link } from "react-router-dom";
import "./MyStocks.css";

const MyStocks = () => {
  const [stocks, setStocks] = useState([]);
  useEffect(() => {
    //fetch lot data from database
    const fetchTrades = async () => {
      try {
        const response =await fetch("http://localhost:5000/api/v1/Lots");
        if (!response.ok) {
          throw new Error("Failed to fetch trades");
        }
        const result = await response.json();       
        setStocks(result.data);
      } catch (error) {
        console.log("api Fetching Error: " + error);
      }
    };

    fetchTrades();
  }, []);

  return (
    <>
      <Header />
      <div className="stocks-container">
        <h1>LOTS</h1>
        <table className="stocks-table">
          <thead>
            <tr>
              <th>Symbol</th>
              <th>Quantity</th>
              <th>Realized</th>
              <th>lot_status</th>
              <th>Actions</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {stocks.map((stock) => (
              <tr key={stock.lot_id}>
                <td>{stock.symbol}</td>
                <td>{stock.lot_quantity}</td>
                <td>{stock.realized_quantity}</td>
                <td>{stock.lot_status}</td>
                <td>
                  <Link to="/">
                    <button className="buy-btn">Buy</button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Footer />
    </>
  );
};

export default MyStocks;
