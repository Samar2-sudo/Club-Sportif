// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import Axios from 'axios';
import { useParams } from 'react-router-dom';
import '../../form.css';

const ProfilPage = () => {
    const { userId } = useParams();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [address, setAddress] = useState('');
    const [phoneNumber, setPhoneNumber] = useState(''); // Garder comme une chaîne de caractères
    const [profileImage, setProfileImage] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('User ID:', userId);
        console.log('First Name:', firstName);
        console.log('Last Name:', lastName);
        console.log('Date of Birth:', dateOfBirth);
        console.log('Address:', address);
        console.log('Phone Number:', phoneNumber); // Afficher le numéro de téléphone
        console.log('Profile Image:', profileImage);

        const formData = new FormData();
        formData.append('firstName', firstName);
        formData.append('lastName', lastName);
        formData.append('dateOfBirth', dateOfBirth);
        formData.append('address', address);
        formData.append('phoneNumber', phoneNumber); // Ajouter le numéro de téléphone aux données du formulaire
        
        if (profileImage) {
            formData.append('profileImage', profileImage);
        }

        try {
            const response = await Axios.post(`http://localhost:3000/profile/${userId}`, formData);
            console.log(response.data);
            // Redirection vers la page d'affichage après soumission réussie
            window.location.href = `/profile/${userId}/display`;
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="profil-form">
            <h2>Profile Form</h2>
            <form onSubmit={handleSubmit}>
                <div className="profil-form-group">
                    <label htmlFor="firstName">First Name:</label>
                    <input type="text" id="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                </div>
                <div className="profil-form-group">
                    <label htmlFor="lastName">Last Name:</label>
                    <input type="text" id="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                </div>
                <div className="profil-form-group">
                    <label htmlFor="dateOfBirth">Date of Birth:</label>
                    <input type="date" id="dateOfBirth" value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)} />
                </div>
                <div className="profil-form-group">
                    <label htmlFor="address">Address:</label>
                    <input type="text" id="address" value={address} onChange={(e) => setAddress(e.target.value)} />
                </div>
                <div className="profil-form-group">
                    <label htmlFor="phoneNumber">Phone Number:</label>
                    <input type="text" id="phoneNumber" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} /> {/* Garder comme une saisie de texte */}
                </div>
                <div className="profil-form-group">
                    <label htmlFor="profileImage">Profile Image:</label>
                    <input type="file" id="profileImage" onChange={(e) => setProfileImage(e.target.files[0])} />
                </div>
                <button className="profil-submit-button" type="submit">Submit</button>
            </form>
        </div>
    );
};

export default ProfilPage;
