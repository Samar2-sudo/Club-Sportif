// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import '../../App.css';
import Axios from 'axios';
import { useParams, useNavigate } from "react-router-dom"; // Import useParams
const ResetPassword = () => {
   
    const [password, setPassword] = useState("");
    const { token } = useParams(); // Use useParams to extract token
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        Axios.post(`http://localhost:3000/reset-password/`+token, { password }) // Append token to URL
            .then(response => {
                if (response.data.status) {
                    alert("password updated");
                    navigate('/login');
                }
                console.log(response.data);
            })
            .catch(err => {
                console.log(err);
            });
    };

    return (
        <div className='container'>
            <div className='form-container sign-in'>
                <form className='sign-up-form' onSubmit={handleSubmit}>
                    <h1>Reset Password</h1>
                    <input 
                        type="password" 
                        placeholder='New Password' 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                    />
                    <button type='submit' className='sign-in-btn'>Reset</button>
                </form>
            </div>
            <div className='toggle-container'>
                <div className='toggle'>
                    <div className='toggle-panel toggle-right'>
                        <h1>Welcome !</h1>
                        <p>
                            Enter your new password .
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResetPassword;
