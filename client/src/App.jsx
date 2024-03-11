// eslint-disable-next-line no-unused-vars
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Components/Home'; // Import Home component
import Signup from './Components/auth/Signup';
import Login from './Components/auth/Login';
import ForgotPassword from './Components/auth/ForgotPassword';
import ResetPassword from './Components/auth/ResetPassword';
import VerificationPage from './Components/auth/VerificationPage';
import ProfilPage from './Components/user/ProfilPage';
import ProfileDisplayPage from './Components/user/ProfileDisplayPage';
import { UserProvider } from './contexts/UserContext';
import UpdateProfilePage from './Components/user/UpdateProfilePage';

function App() {
  return (
    <BrowserRouter>
      <UserProvider>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} /> {/* Use the Home component */}
          <Route path="/forgotPassword" element={<ForgotPassword />} />
          <Route path="/resetPassword/:token" element={<ResetPassword />} />
          <Route path="/verification" element={<VerificationPage />} /> 
          <Route path="/profile/:userId" element={<ProfilPage />} />
          <Route path="/profile/:userId/display" element={<ProfileDisplayPage />} />
          <Route path="/profile/:userId/update" element={<UpdateProfilePage />} />
        </Routes>
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;
