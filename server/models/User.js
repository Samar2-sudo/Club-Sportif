import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    googleId: { type: String },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    validationCode: { type: String },
    emailVerified: { type: Boolean, default: false },
    firstName: { type: String },
    lastName: { type: String },
    dateOfBirth: { type: Date },
    address: { type: String },
    profileImage: {
        data: Buffer, // Données binaires de l'image
        contentType: String, // Type de contenu de l'image (par exemple, image/png, image/jpeg, etc.)
        imageUrl: String // URL de l'image ou nom du fichier
    },
    phoneNumber: { type:String  }
});


const User = mongoose.model("User", UserSchema);

export { User };
