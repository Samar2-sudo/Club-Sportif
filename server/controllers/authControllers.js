// importez les modules nécessaires
import bcrypt from 'bcrypt';
import { User } from '../models/User.js';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';

// Fonction pour l'inscription d'un nouvel utilisateur
const signup = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Vérification si l'utilisateur existe déjà
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.json({ status: false, message: "User already exists" });
        }

        // Hash du mot de passe
        const hashedPassword = await bcrypt.hash(password, 10);

        // Génération d'un code de validation
        const validationCode = Math.floor(100000 + Math.random() * 900000).toString();

        // Création d'une nouvelle instance utilisateur avec le code de validation
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            validationCode
        });

        // Envoi de l'e-mail de validation
        sendValidationEmail(email, validationCode);

        // Sauvegarde du nouvel utilisateur dans la base de données
        await newUser.save();

        // Retourner un message de succès
        return res.status(201).json({ status: true, message: "User registered successfully" });
    } catch (error) {
        // Gestion des erreurs
        console.error(error);
        return res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

// Fonction pour la connexion de l'utilisateur
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Recherche de l'utilisateur par e-mail
        const user = await User.findOne({ email });
        if (!user) {
            return res.json({ message: "User is not registered" });
        }

        // Vérification du mot de passe
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.json({ message: "Password is incorrect" });
        }

        // Génération du token JWT pour l'utilisateur
        const token = jwt.sign({ username: user.username }, process.env.KEY, { expiresIn: '1h' });

        // Définition du cookie avec le token JWT
        res.cookie('token', token, { httponly: true, maxAge: 360000 });

        // Retourner un message de succès avec l'ID de l'utilisateur
        return res.json({ status: true, message: "Login successful", userId: user._id });
    } catch (error) {
        // Gestion des erreurs
        console.error(error);
        return res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

// Fonction pour l'envoi d'un e-mail de réinitialisation de mot de passe
const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;

        // Recherche de l'utilisateur par e-mail
        const user = await User.findOne({ email });
        if (!user) {
            return res.json({ message: "User not registered" });
        }

        // Génération d'un token pour la réinitialisation de mot de passe
        const token = jwt.sign({ id: user._id }, process.env.KEY, { expiresIn: '5m' });

        // Configuration de nodemailer pour l'envoi de l'e-mail
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'onsboukhris1@gmail.com', // Votre adresse e-mail Gmail
                pass: 'filiszgwczhpwuiv' // Votre mot de passe Gmail
            }
        });

        // Options pour l'e-mail de réinitialisation de mot de passe
        var mailOptions = {
            from: 'onsboukhris1@gmail.com',
            to: email,
            subject: 'Reset Password',
            text: `http://localhost:5173/resetPassword/${token}`
        };

        // Envoi de l'e-mail
        transporter.sendMail(mailOptions, function(error, info) {
            if (error) {
                return res.json({ message: "Error sending email" });
            } else {
                return res.json({ status: true, message: "Email sent" });
            }
        });
    } catch (error) {
        // Gestion des erreurs
        console.error(error);
        return res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

// Fonction pour réinitialiser le mot de passe
const resetPassword = async (req, res) => {
    try {
        const token = req.params.token;
        const { password } = req.body;

        // Vérification et décryptage du token
        const decoded = jwt.verify(token, process.env.KEY);
        const id = decoded.id;

        // Hash du nouveau mot de passe
        const hashedPassword = await bcrypt.hash(password, 10);

        // Mise à jour du mot de passe dans la base de données
        await User.findByIdAndUpdate({ _id: id }, { password: hashedPassword });

        // Retourner un message de succès
        return res.json({ status: true, message: "Password updated" });
    } catch (error) {
        // Gestion des erreurs
        console.error(error);
        return res.json("Invalid token");
    }
};

// Fonction pour envoyer un e-mail de validation
const sendValidationEmail = (email, validationCode) => {
    // Configuration de nodemailer pour l'envoi de l'e-mail
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'onsboukhris1@gmail.com', // Votre adresse e-mail Gmail
            pass: 'filiszgwczhpwuiv' // Votre mot de passe Gmail
        }
    });

    // Options pour l'e-mail de validation
    const mailOptions = {
        from: 'onsboukhris1@gmail.com',
        to: email,
        subject: 'Validation Email',
        text: `Your validation code is: ${validationCode}`
    };

    // Envoi de l'e-mail
    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
};

// Fonction pour vérifier l'e-mail de validation
const verifyEmail = async (req, res) => {
    try {
        const { email, verificationCode } = req.body;
        console.log('Données de vérification de l\'e-mail reçues :', { email, verificationCode });

        if (!email || !verificationCode) {
            return res.status(400).json({ status: false, message: "Email and verification code are required" });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.json({ status: false, message: "User not found" });
        }

        if (user.validationCode !== verificationCode) {
            return res.json({ status: false, message: "Invalid verification code" });
        }

        // Mettre à jour le champ emailVerified dans la base de données pour marquer l'e-mail comme vérifié
        user.emailVerified = true;
        await user.save();

        return res.json({ status: true, message: "Email verified successfully" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};
// Export des fonctions
export { signup, login, forgotPassword, resetPassword, sendValidationEmail, verifyEmail  };
