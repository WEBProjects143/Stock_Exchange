import React, { useState } from "react";
import Loader from "../loader/loader";
import {useNavigate } from "react-router-dom";
import "./login.css"

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loader, setLoader] = useState(false);
const Navigate=useNavigate();
  const handleSubmit = async(e) => {
    setLoader(true)
    e.preventDefault();
    // Handle login logic here
    const loginnData={
      email:email,
      password:password,

    }
     const data=await fetch("http://localhost:5000/api/v2/Login",{
      method:"post",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify(loginnData)
  
     })

     if(!data.ok){
      setLoader(false)
      console.log("Login Frontend error")
     }else{
       return Navigate("/home ")
     }
  };

  return (
    <>
    {!loader ? (
      <>
        <div className="login-container">
          <h2>Login</h2>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button type="submit">Login</button>
          </form>
        </div>

        <a href="/home" className="back">Back</a>
      </>
    ) : (
      <Loader />
    )}
  </>
  );
};

export default Login;
