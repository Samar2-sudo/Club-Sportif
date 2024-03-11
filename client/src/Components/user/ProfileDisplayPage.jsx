// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import '../../profil.css';

const ProfileDisplayPage = () => {
    const { userId } = useParams();
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const response = await Axios.get(`http://localhost:3000/profile/${userId}`);
                setUserData(response.data);
            } catch (error) {
                console.error('Error fetching user profile:', error);
            }
        };

        fetchUserProfile();
    }, [userId]);

    if (!userData) {
        return <div>Loading...</div>;
    }

    const formattedDateOfBirth = new Date(userData.dateOfBirth).toLocaleDateString();

    return (
        <div className="profile-details">
            <h2>User Profile</h2>
            <div>
                <p>First Name: {userData.firstName}</p>
                <p>Last Name: {userData.lastName}</p>
                <p>Date of Birth: {formattedDateOfBirth}</p>
                <p>Address: {userData.address}</p>
                <p>Phone Number: {userData.phoneNumber}</p> {/* Afficher le numéro de téléphone */}
                <p>Profile Image: <img className="profile-image" src={userData.profileImage.imageUrl} alt="Profile" /></p>
            </div>
            <div>
                <Link to={`/profile/${userId}/update`} className="profile-update-link">Update Profile</Link>
            </div>
        </div>
    );
};

export default ProfileDisplayPage;
