// authRoutes.js

import express from 'express';
import { signup, login, forgotPassword, resetPassword, sendValidationEmail, verifyEmail } from '../controllers/authControllers.js';

const router = express.Router();

// Signup route
router.post('/signup', signup);

// Login route
router.post('/login', (req, res, next) => {
    // Call the login controller function
    login(req, res, (err) => {
        if (err) {
            return res.redirect('/login'); // Redirect to login page on login failure
        }
        // Redirect to home page with user ID as a query parameter on successful login
        const userId = req.user._id;
        if (!userId) {
            return res.redirect('/login'); // Redirect to login page if user ID is not available
        }
        res.redirect(`http://localhost:5173/?userId=${userId}`);
    });
});

// Forgot password route
router.post('/forgot-password', forgotPassword);

// Reset password route
router.post('/reset-password/:token', resetPassword);

// Email verification route
router.post('/send-validation-email', sendValidationEmail);

router.post('/verify-email', verifyEmail);

export default router;
