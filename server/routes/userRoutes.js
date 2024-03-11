import express from 'express';
import multer from 'multer';
import { updateProfile, getProfile, updateUserProfile, findOneUser } from '../controllers/userController.js';

const router = express.Router();

// Configuration de multer pour gérer les fichiers
const upload = multer({ dest: 'uploads/' }); // Spécifiez le dossier où les fichiers seront stockés temporairement

// Route de mise à jour de profil avec multer comme middleware
router.post('/profile/:userId', upload.single('profileImage'), updateProfile);

// Route pour récupérer les données du profil utilisateur
router.get('/profile/:userId', getProfile);

// Route pour mettre à jour le profil utilisateur
// Route pour mettre à jour le profil utilisateur avec Multer
router.put('/profile/:userId/update', upload.single('profileImage'), updateUserProfile);

// Route to find a user by ID
router.get('/user/:userId', findOneUser);

export default router;
