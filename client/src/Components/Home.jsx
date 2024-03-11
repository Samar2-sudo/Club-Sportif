// eslint-disable-next-line no-unused-vars
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Layout, Menu, Button, Card, Space } from 'antd';

const { Header, Footer, Content } = Layout;

const Home = () => {
  const location = useLocation();
  const userId = location.state?.userId || new URLSearchParams(location.search).get('userId');

  return (
    <Layout>
      <Header
        style={{
          display: 'flex',
          justifyContent: 'space-between', // Align items to the start and end of the header
          alignItems: 'center',
          width: '100%',
          position: 'sticky',
          top: 0,
          zIndex: 1,
        }}
      >
        <div className="demo-logo" />
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']} style={{ flex: 1, minWidth: 0 }}>
          {/* Your menu items here */}
        </Menu>
        <div>
          {userId && (
            <>
              <Link to={`/profile/${userId}`}>
                <Button type="default" style={{ marginRight: '8px' }}>Create Profile</Button>
              </Link>
              <Link to={`/profile/${userId}/display`}>
                <Button type="default">View Your Profile</Button>
              </Link>
              {/* Add space between buttons */}
              <div style={{ marginLeft: '8px', marginRight: '8px'}} />
            </>
          )}
        </div>
        <div>
          <Link to="/logout">
            <Button style={{ marginLeft: '8px'}}>Logout</Button>
          </Link>
        </div>
      </Header>
      <Content>
        <div>
          <h1>Welcome to the Home Page</h1>
          {userId ? (
            <div>
              <p>Welcome, user!</p>
              
              <div>
                <Space direction="horizontal" size="middle">
                  <Card title="Card" size="small">
                    <p>Card content</p>
                    <p>Card content</p>
                  </Card>
                  <Card title="Card" size="small">
                    <p>Card content</p>
                    <p>Card content</p>
                  </Card>
                  <Card title="Card" size="small">
                    <p>Card content</p>
                    <p>Card content</p>
                  </Card>
                </Space>
              </div>
            </div>
          ) : (
            <p>Please login to access your profile</p>
          )}
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

export default Home;
