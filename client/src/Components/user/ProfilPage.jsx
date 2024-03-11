// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import Axios from 'axios';
import { useParams } from 'react-router-dom';
import { Form, Input, DatePicker, Upload, Button, Layout, Menu } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import moment from 'moment';
import '../../form.css';

const { Header, Content, Footer } = Layout;

const ProfilPage = () => {
    const { userId } = useParams();
    const [profileImage, setProfileImage] = useState(null);

    const handleSubmit = async (values) => {
        console.log('User ID:', userId);
        console.log('Form values:', values);
        console.log('Profile Image:', profileImage);

        const formData = new FormData();
        formData.append('userId', userId);
        Object.entries(values).forEach(([key, value]) => {
            if (key === 'dateOfBirth') {
                formData.append(key, moment(value).format('YYYY-MM-DD'));
            } else {
                formData.append(key, value);
            }
        });

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
        <Layout>
            <Header
                style={{
                    position: 'sticky',
                    top: 0,
                    zIndex: 1,
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                }}
            >
                <div className="demo-logo" />
                <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']} style={{ flex: 1, minWidth: 0 }}>
                    <Menu.Item key="1">Logout</Menu.Item>
                    <Menu.Item key="2">Profile</Menu.Item>
                </Menu>
            </Header>
            <Content
                style={{
                    padding: '0 48px',
                }}
            >
                <div
                    style={{
                        padding: 24,
                        minHeight: 380,
                        background: '#fff', // Adjust background color as needed
                        borderRadius: 10, // Adjust border radius as needed
                    }}
                >
                    {/* Your form component goes here */}
                    <div className="profil-form">
                        <h2>Profile Form</h2>
                        <Form
                            labelCol={{ span: 8 }}
                            wrapperCol={{ span: 16 }}
                            onFinish={handleSubmit}
                            initialValues={{ dateOfBirth: moment() }}
                            style={{ maxWidth: 600 }}
                        >
                            <Form.Item label="First Name" name="firstName">
                                <Input />
                            </Form.Item>
                            <Form.Item label="Last Name" name="lastName">
                                <Input />
                            </Form.Item>
                            <Form.Item label="Date of Birth" name="dateOfBirth">
                                <DatePicker />
                            </Form.Item>
                            <Form.Item label="Address" name="address">
                                <Input />
                            </Form.Item>
                            <Form.Item label="Phone Number" name="phoneNumber">
                                <Input />
                            </Form.Item>
                            <Form.Item label="Profile Image">
                                <Upload
                                    action="/upload.do"
                                    onChange={(info) => {
                                        if (info.file.status === 'done') {
                                            setProfileImage(info.file.originFileObj);
                                        }
                                    }}
                                >
                                    <Button icon={<UploadOutlined />}>Upload</Button>
                                </Upload>
                            </Form.Item>
                            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                                <Button className="profil-submit-button" type="primary" htmlType="submit">Submit</Button>
                            </Form.Item>
                        </Form>
                    </div>
                </div>
            </Content>
            <Footer
                style={{
                    textAlign: 'center',
                }}
            >
                Ant Design ©{new Date().getFullYear()} Created by Ant UED
            </Footer>
        </Layout>
    );
};

export default ProfilPage;
