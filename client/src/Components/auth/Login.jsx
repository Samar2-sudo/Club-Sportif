// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import '../../App.css';
import Axios from 'axios';
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!email || !password) {
            alert("Please fill in all fields");
            return;
        }

        Axios.post('http://localhost:3000/login', { email, password })
            .then(response => {
                if (response.data.status) {
                    navigate('/', { state: { userId: response.data.userId } }); // Pass userId as state
                } else {
                    alert("Invalid email or password");
                }
            })
            .catch(err => {
                console.log(err);
                alert("An error occurred. Please try again later.");
            });
    };

    const loginWithGoogle = (e) => {
        e.preventDefault();
        window.location.href = "http://localhost:3000/auth/google/callback";
    };

    return (
        <div className='container'>
            <div className='form-container sign-in'>
                <form onSubmit={handleSubmit}>
                    <h1>Sign In</h1>
                    <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                    <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                    <Link to="/forgotPassword">Forget Your Password?</Link>
                    <button type='submit'  className='sign-in-btn '>Sign In</button>
                    <button className='google_btn google_btn_custom' onClick={loginWithGoogle}>
                        <img src="./images/google.png" alt="google icon" />
                        <span>Sign up with Google</span>
                    </button>
                </form>
            </div>
            <div className='toggle-container'>
                <div className='toggle'>
                    <div className='toggle-panel toggle-left'>
                        <h1>Welcome Back!</h1>
                        <p>Enter your personal details to use all site features</p>
                    </div>
                    <div className='toggle-panel toggle-right'>
                        <h1>Hello, Friend!</h1>
                        <p>Register with your personal details <br /> to use all site features</p>
                        <Link to="/signup">
                            <button className='sign-up-button' id="login">Sign Up</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
