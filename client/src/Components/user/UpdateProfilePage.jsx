// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect, useCallback } from 'react';
import Axios from 'axios';
import { useParams } from 'react-router-dom';
import '../../form.css'; // Assurez-vous d'importer votre fichier CSS

const UpdateProfilePage = () => {
    const { userId } = useParams();
    const [userData, setUserData] = useState({
        firstName: '',
        lastName: '',
        dateOfBirth: '',
        address: '',
        profileImage: null,
        phoneNumber: '' // Nouvel état pour le numéro de téléphone
    });

    // Fonction pour récupérer les données de l'utilisateur depuis le backend
    const fetchUserProfile = useCallback(async () => {
        try {
            const response = await Axios.get(`http://localhost:3000/profile/${userId}`);
            const userData = response.data; // Données de l'utilisateur récupérées depuis le backend
            setUserData(userData); // Met à jour le state avec les données de l'utilisateur
        } catch (error) {
            console.error('Error fetching user profile:', error);
            // Gérer les erreurs de récupération des données du profil
        }
    }, [userId]); // userId est une dépendance de useCallback

    useEffect(() => {
        // Appeler la fonction de récupération des données du profil lors du chargement du composant
        fetchUserProfile();
    }, [fetchUserProfile]); // fetchUserProfile est la seule dépendance de useEffect

    // Fonction pour gérer la soumission du formulaire
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('firstName', userData.firstName);
            formData.append('lastName', userData.lastName);
            formData.append('dateOfBirth', userData.dateOfBirth);
            formData.append('address', userData.address);
            formData.append('phoneNumber', userData.phoneNumber); // Ajout du numéro de téléphone aux données du formulaire
            if (userData.profileImage) {
                formData.append('profileImage', userData.profileImage); // Assurez-vous que profileImage est bien défini
            }
            await Axios.put(`http://localhost:3000/profile/${userId}/update`, formData);
            console.log('Profile updated successfully');
            alert('Profile updated successfully');
            // Redirection vers la page de profil après soumission réussie
            window.location.href = `/profile/${userId}/display`;
        } catch (error) {
            console.error('Error updating profile:', error);
            alert('Failed to update profile');
        }
    };

    // Fonction pour mettre à jour le state lors de la modification des champs du formulaire
    const handleInputChange = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value });
    };

    return (
        <div className="profil-form">
            <h2>Update Profile</h2>
            <form onSubmit={handleSubmit}>
                <div className="profil-form-group">
                    <label htmlFor="firstName">First Name:</label>
                    <input type="text" id="firstName" name="firstName" value={userData.firstName} onChange={handleInputChange} />
                </div>
                <div className="profil-form-group">
                    <label htmlFor="lastName">Last Name:</label>
                    <input type="text" id="lastName" name="lastName" value={userData.lastName} onChange={handleInputChange} />
                </div>
                <div className="profil-form-group">
                    <label htmlFor="dateOfBirth">Date of Birth:</label>
                    <input type="date" id="dateOfBirth" name="dateOfBirth" value={userData.dateOfBirth} onChange={handleInputChange} />
                </div>
                <div className="profil-form-group">
                    <label htmlFor="address">Address:</label>
                    <input type="text" id="address" name="address" value={userData.address} onChange={handleInputChange} />
                </div>
                <div className="profil-form-group">
                    <label htmlFor="phoneNumber">Phone Number:</label>
                    <input type="text" id="phoneNumber" name="phoneNumber" value={userData.phoneNumber} onChange={handleInputChange} />
                </div>
                <div className="profil-form-group">
                    <label htmlFor="profileImage">Profile Image:</label>
                    <input type="file" id="profileImage" name="profileImage" onChange={(e) => setUserData({ ...userData, profileImage: e.target.files[0] })} />
                </div>
                <button className="profil-submit-button" type="submit">Submit</button>
            </form>
        </div>
    );
};

export default UpdateProfilePage;
