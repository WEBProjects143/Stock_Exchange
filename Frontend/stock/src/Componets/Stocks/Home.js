import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../Header/Header";
import Footer from "../../Footer/Footer";
import ProductList from "./products/ProductCard";
import './Home.css';

function Home() {
  const [user,setUser]=useState(null)
  const Navigate=useNavigate();

  const getSession=async()=>{
    const sessionID=await fetch("http://localhost:5000/api/v2/session")
    const sesdata=await sessionID.json()
    console.log("sesdata"+JSON.stringify(sesdata))
    if(sesdata.ok){
      setUser(sesdata.user)
    }
  }
  // useEffect(()=>{
  //   getSession()
  // },[])
  const handleSubmit=async(e)=>{
    e.preventDefault();
    const data=await fetch("http://localhost:5000/api/v2/Logout",{
      method:"post",
      credentials: 'include'
     })
     setUser(null)
     console.log("logout"+data)
  }
  console.log("user "+user)
  return (
    
    <div className="Home">
    <Header/>
    {user ? ( 
      Navigate("/login")
    ):(
      <>
        <main className="main-content">
        <ul className="links">
              <li><a href="/login">Login</a></li>
              <li><a href="/reg">Register</a></li>
              <li><p  onClick={handleSubmit}>Logout</p></li>
            </ul>
          <h1>Welcome to Our Website</h1>
          <p>Explore the best content here!</p>
        </main>
        <section className="section-container">
          <ProductList />
        </section>
      </>
    )}
    <Footer/>
    </div>
  );
}

export default Home;