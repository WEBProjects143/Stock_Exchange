import React from "react";
import Header from "../../Header/Header";
import Footer from "../../Footer/Footer";
import ProductList from "./products/ProductCard";
import './Home.css';

function Home() {
  return (
    <div className="Home">
    <Header/>
      <main className="main-content">
      <ul className="links">
            <li><a href="/login">Login</a></li>
            <li><a href="/reg">Register</a></li>
          </ul>
        <h1>Welcome to Our Website</h1>
        <p>Explore the best content here!</p>
      </main>
      <section className="section-container">
        <ProductList />
      </section>
    <Footer/>
    </div>
  );
}

export default Home;