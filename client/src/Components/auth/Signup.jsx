// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import Axios from 'axios';
import { Link, useNavigate } from "react-router-dom";
import '../../App.css';

const Signup = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!username || !email || !password) {
            alert("Please fill in all fields");
            return;
        }

        if (password.length < 8) {
            alert("Password must be at least 8 characters long");
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert("Please enter a valid email address");
            return;
        }

        try {
            const response = await Axios.post('http://localhost:3000/signup', { username, email, password });
            if (response.data.status) {
                // Enregistrement de l'e-mail dans localStorage
                localStorage.setItem('userEmail', email);
                navigate('/verification');
            } else {
                alert(response.data.message);
            }
        } catch (error) {
            console.error(error);
            alert("An error occurred. Please try again later.");
        }
    };

    return (
        <div className='container'>
            <div className='form-container sign-in'>
                <form className='sign-up-form' onSubmit={handleSubmit}>
                    <h1>Signup</h1>
                    
                    <input type="text" id="username" placeholder='Username' value={username} onChange={(e) => setUsername(e.target.value)} />
                  
                    <input type="email" id="email" autoComplete='off' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
                    
                    <input type="password" id="password" placeholder='**********' value={password} onChange={(e) => setPassword(e.target.value)} />
                    <button type='submit' className='sign-in-btn'>Sign up</button>
                    
                </form>
            </div>
            <div className='toggle-container'>
                <div className='toggle'>
                    
                    <div className='toggle-panel toggle-right'>
                    <h1>Welcome Back!</h1>
                    <p>
        Enter your personal details <br /> to use all site features
    </p>
                        <Link to="/login">
                            <button className='sign-up-button' id="login">Sign In</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;
