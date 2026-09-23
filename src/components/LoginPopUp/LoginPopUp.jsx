import React, { useState } from 'react'
import './LoginPopUp.css'
import { assets } from '../../assets/assets'

const LoginPopUp = ({ setShowlogin }) => {
  const [currState, setCurrState] = useState("Login")
  const [data, setData] = useState({
    name: "",
    email: "",
    password: ""
  })

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();

    // Get existing users array or initialize an empty array
    const existingUsers = JSON.parse(localStorage.getItem("users")) || [];

    if (currState === "Sign Up") {
      // Check if user already exists
      const userExists = existingUsers.some((user) => user.email === data.email);

      if (userExists) {
        alert("An account with this email already exists!");
        return;
      }

      // Save new user
      const newUser = {
        name: data.name,
        email: data.email,
        password: data.password
      };

      existingUsers.push(newUser);
      localStorage.setItem("users", JSON.stringify(existingUsers));

      // Save logged-in session user info
      localStorage.setItem("user", JSON.stringify({ name: newUser.name, email: newUser.email }));
      alert("Account created successfully!");
      setShowlogin(false);

    } else {
      // Login validation
      const foundUser = existingUsers.find(
        (user) => user.email === data.email && user.password === data.password
      );

      if (foundUser) {
        // Save logged-in session user info
        localStorage.setItem("user", JSON.stringify({ name: foundUser.name, email: foundUser.email }));
        alert("Logged in successfully!");
        setShowlogin(false);
      } else {
        alert("Invalid email or password!");
      }
    }
  };

  return (
    <div className='login-pop-up'>
      <form onSubmit={onSubmitHandler} className='login-pop-up-contener'>
        <img className='icon-group1' src={assets.group1} alt="" />
        <button type='button' className='cross-act' onClick={() => setShowlogin(false)}>❌</button>
        
        <div className="login-pop-up-title">
          <h1>{currState}</h1>
        </div>

        <div className="login-pop-up-inputs">
          {currState !== "Login" && (
            <input 
              autoComplete='off' 
              autoFocus 
              name='name' 
              onChange={onChangeHandler} 
              value={data.name} 
              type="text" 
              placeholder='Your Name' 
              required
            />
          )}
          
          <input 
            autoComplete='off' 
            name='email' 
            onChange={onChangeHandler} 
            value={data.email}  
            type="email" 
            placeholder='Email' 
            required
          />
          <input 
            autoComplete='off' 
            name='password' 
            onChange={onChangeHandler} 
            value={data.password}  
            type="password" 
            placeholder='Password' 
            required
          />
        </div>

        <button type='submit'>
          {currState === "Sign Up" ? "Create Account" : "Login"}
        </button>

        <div className="login-pop-up-condition">
          <input type="checkbox" required />
          <p className='agree'>Continuing agree with our privacy</p>
        </div>

        {currState === "Login" ? (
          <p>Create new account? <span onClick={() => setCurrState("Sign Up")}>click here</span></p>
        ) : (
          <p>Already have an account? <span onClick={() => setCurrState("Login")}>login here</span></p>
        )}
      </form>
    </div>
  )
}

export default LoginPopUp