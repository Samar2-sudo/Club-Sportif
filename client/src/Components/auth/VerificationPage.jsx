// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import Axios from 'axios';
import '../../App.css';
import { useNavigate } from 'react-router-dom';

const VerificationPage = () => {
    const [verificationCode, setVerificationCode] = useState('');
    const navigate = useNavigate();

    const userEmail = localStorage.getItem('userEmail') || '';

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            if (!verificationCode.trim()) {
                alert("Please enter the verification code.");
                return;
            }

            const response = await Axios.post('http://localhost:3000/verify-email', { email: userEmail, verificationCode });
            if (response.data.status) {
                navigate('/login');
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
                    <h1>Verification Page</h1>
                    <p>{userEmail}</p>
                    
                    <input type="text" id="verificationCode"  placeholder="Enter verification code" value={verificationCode} onChange={(e) => setVerificationCode(e.target.value)} />
                    <button type="submit" className='sign-in-btn'>Verify</button>
                </form>
            </div>
            <div className='toggle-container'>
                <div className='toggle'>
                    <div className='toggle-panel toggle-right'>
                        <h1>Welcome !</h1>
                        <p>Please enter the verification code  <br/> to complete the verification process.</p>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default VerificationPage;
