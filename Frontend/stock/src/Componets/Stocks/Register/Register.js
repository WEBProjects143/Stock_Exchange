import React, { useState } from "react";
import "./Register.css";  // Importing the separate CSS for Register

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async(e) => {
    e.preventDefault();

  const userData={
    username:username,
    email:email,
    password:password,
    confirmPassword:confirmPassword
  }
   const data=await fetch("http://localhost:5000/api/v1/Register",{
    method:"post",
    headers:{
      "Content-Type":"application/json"
    },
    body:JSON.stringify(userData)

   })
   if(!data.ok){
    console.log("Frontend error while sending data")
   }
  };

  return (
    <>
      <div className="register-container">
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
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
          <div className="form-group">
            <label htmlFor="confirm-password">Confirm Password</label>
            <input
              type="password"
              id="confirm-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">Register</button>
        </form>
      </div>
      <a href="/home" className="back">Back</a>`
    </>
  );
};

export default Register;
