import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [username , setuserName] = useState("");
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false)

    const handleSubmit=()=>{
        if(username==="admin"){
            navigate('/Productpage');
        }
        else{
            alert("Invalid Credintials");
        }
    }
    
  return (
    <div className='Login'>
        <h1>Login</h1>
        <input type='text' placeholder='Enter your name' onChange={(e)=> setuserName(e.target.value)}></input>
        <input
            type={showPassword ? "text" : "password"}
            placeholder='password'
          />
        <button onClick={handleSubmit} style={{marginLeft:'20px'}}>Submit</button>
    </div>
  )
}

export default Login