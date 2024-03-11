import { User } from '../models/User.js';

const updateProfile = async (req, res) => {
    try {
        const userId = req.params.userId;
        const { firstName, lastName, dateOfBirth, address,phoneNumber } = req.body;

        // Vérifier si un fichier image est téléchargé
        if (!req.file) {
            return res.status(400).json({ message: 'Profile image is required' });
        }

        // Obtenir les données du fichier image téléchargé
        const { buffer, mimetype, originalname } = req.file;

        // Recherchez l'utilisateur dans la base de données
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Mettre à jour les données du profil
        user.firstName = firstName;
        user.lastName = lastName;
        user.dateOfBirth = dateOfBirth;
        user.address = address;
        user.phoneNumber = phoneNumber; 
        
        // Enregistrer les données de l'image dans le modèle utilisateur
        user.profileImage.data = buffer; // Stocker les données binaires de l'image
        user.profileImage.contentType = mimetype; // Stocker le type de contenu de l'image
        user.profileImage.imageUrl = `uploads/${originalname}`; // Stocker l'URL de l'image ou le nom du fichier

        // Sauvegarder les modifications dans la base de données
        await user.save();

        // Retourner une réponse avec un message de succès
        return res.status(200).json({ message: 'Profile updated successfully' });
    } catch (error) {
        console.error("Error updating profile:", error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

const getProfile = async (req, res) => {
    try {
        const userId = req.params.userId;

        // Recherchez l'utilisateur dans la base de données
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Retourner les données du profil de l'utilisateur
        return res.status(200).json(user);
    } catch (error) {
        console.error("Error fetching user profile:", error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

const updateUserProfile = async (req, res) => {
    try {
        const userId = req.params.userId;
        const { firstName, lastName, dateOfBirth, address,phoneNumber } = req.body;

        // Recherchez l'utilisateur dans la base de données
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Mettre à jour les données du profil
        user.firstName = firstName;
        user.lastName = lastName;
        user.dateOfBirth = dateOfBirth;
        user.address = address;
        user.phoneNumber = phoneNumber; 

        // Vérifier si un fichier image est téléchargé
        if (req.file) {
            // Obtenir les données du fichier image téléchargé
            const { buffer, mimetype, originalname } = req.file;
            
            // Enregistrer les données de l'image dans le modèle utilisateur
            user.profileImage.data = buffer; // Stocker les données binaires de l'image
            user.profileImage.contentType = mimetype; // Stocker le type de contenu de l'image
            user.profileImage.imageUrl = `uploads/${originalname}`; // Stocker l'URL de l'image ou le nom du fichier
        }

        // Sauvegarder les modifications dans la base de données
        await user.save();

        // Retourner une réponse avec un message de succès
        return res.status(200).json({ message: 'Profile updated successfully' });
    } catch (error) {
        console.error("Error updating user profile:", error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};
const findOneUser = async (req, res) => {
    try {
        const { userId } = req.params;

        // Find the user by userId
        const user = await User.findOne({ _id: userId });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        return res.json(user);
    } catch (error) {
        console.error('Error finding user:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

export { updateProfile, getProfile, updateUserProfile , findOneUser};
