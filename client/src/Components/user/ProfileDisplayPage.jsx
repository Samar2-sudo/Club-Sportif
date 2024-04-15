// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import { Layout, Button, Menu } from 'antd';
import '../../profil.css';

const { Header, Content, Footer } = Layout;

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
        <Layout>
            <Header>
                <div className="logo" />
                <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
                    <Menu.Item key="1">Logout</Menu.Item>
                    <Menu.Item key="2">Profile</Menu.Item>
                </Menu>
            </Header>
            <Content className="site-layout" style={{ padding: '0 50px', marginTop: 16 }}> {/* Reduced marginTop from 64 to 16 */}
                <div className="site-layout-content">
                    <div className="profile-details">
                        <h2>User Profile</h2>
                        <div>
                            <p>First Name: {userData.firstName}</p>
                            <p>Last Name: {userData.lastName}</p>
                            <p>Date of Birth: {formattedDateOfBirth}</p>
                            <p>Address: {userData.address}</p>
                            <p>Phone Number: {userData.phoneNumber}</p>
                            <p>Profile Image: <img className="profile-image" src={userData.profileImage.imageUrl} alt="Profile" /></p>
                        </div>
                        <div>
                            <Link to={`/profile/${userId}/update`} className="profile-update-link">
                                <Button type="primary">Update Profile</Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>Ant Design ©2024 Created by Ant UED</Footer>
        </Layout>
    );
};

export default ProfileDisplayPage;
