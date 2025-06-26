import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css'; 
import Home from './Home';

const Login = () => {
    const [username, setUserName] = useState("");
    const [password, setPassword] = useState(""); 
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = () => {
        
        if (username && password) {
            navigate('/Home');
        } else {
            alert("Please enter both username and password");
        }
    }

    return (
        <div className='Login'>
            <h1>Login</h1>
            <input
                type='text'
                placeholder='Enter your name'
                onChange={(e) => setUserName(e.target.value)}
            />
            <div>
                <input
                    type={showPassword ? "text" : "password"}
                    placeholder='password'
                    onChange={(e) => setPassword(e.target.value)} 
                />
            </div>
            <button onClick={handleSubmit} style={{ marginLeft: '20px' }}>Submit</button>
        </div>
    )
}

export default Login