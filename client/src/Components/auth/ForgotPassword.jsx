// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import '../../App.css';
import Axios from 'axios';
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validation de l'e-mail
        if (!email || !/\S+@\S+\.\S+/.test(email)) {
            setError("Veuillez entrer une adresse e-mail valide.");
            return;
        }

        Axios.post('http://localhost:3000/forgot-password', { email })
            .then(response => {
                if (response.data.status) {
                    setSuccess(true);
                    setError("");
                    setEmail(""); // Efface le champ e-mail après soumission réussie
                    alert("Check your email for the password reset link");
                    navigate('/login');
                } else {
                    setError("Une erreur s'est produite. Veuillez réessayer plus tard.");
                    setSuccess(false);
                }
            })
            .catch(err => {
                setError("Une erreur s'est produite. Veuillez réessayer plus tard.");
                console.log(err);
            });
    };

    return (
        <div className='container'>
            <div className='form-container sign-in'>
                <form className='sign-up-form' onSubmit={handleSubmit}>
                    <h1>Forgot Password</h1>
                    <input 
                        type="email" 
                        autoComplete='off' 
                        placeholder='Email' 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                    />
                    {error && <p className="error">{error}</p>}
                    {success && <p className="success">Vérifiez votre e-mail pour le lien de réinitialisation du mot de passe.</p>}
                    <button type='submit' className='sign-in-btn'>Send</button>
                </form>
            </div>
            <div className='toggle-container'>
                <div className='toggle'>
                    
                    <div className='toggle-panel toggle-right'>
                        <h1>Welcome !</h1>
                        
                        <p>
                            Enter your email address <br /> to reset your password.
                        </p>


                       
                      
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
