import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import cors from 'cors'
import cookieParser from 'cookie-parser'
dotenv.config()
import { OAuthStrategy } from 'passport-google-oauth'
const clientid ="438289046069-tscgoj972v98n92mdm6esr7cu895d24e.apps.googleusercontent.com"
const clientsecret ="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"
import session from 'express-session';
import passport from 'passport';
import {User} from './models/User.js'
import authRoutes from './routes/authRoutes.js'; // Import authRoutes
import userRoutes from './routes/userRoutes.js'; // Import authRoutes
import connectDB from './connexion/connexion.js';

import * as passportGoogleOAuth2 from 'passport-google-oauth2';
const OAuth2Strategy = passportGoogleOAuth2.Strategy;

const app = express()
app.use(express.json())
app.use(cors({
    origin:["http://localhost:5173"],
    credentials:true

}))
app.use(cookieParser())
app.listen(process.env.PORT, () => {
    console.log("server is running")
})
connectDB();

//setup session
app.use(session({
    secret:"5892440222hhjuhytfclopiv",
    resave:false,
    saveUninitialized:true
}))


// Define routes using authRoutes middleware
app.use(authRoutes);
app.use(userRoutes);

//setup passport
app.use(passport.initialize());
app.use(passport.session());
passport.use(
    new OAuth2Strategy({
        clientID: clientid,
        clientSecret: clientsecret,
        callbackURL:"/auth/google/callback",
        scope:["profile","email"]
    },
    async(accessToken,refreshToken,profile,done)=>{
        console.log("profile",profile)
        try{
let user =await User.findOne({googleId:profile.id});
if(!user){
    user = new User({
        googleId:profile.id,
        username: profile.displayName,
        email: profile.emails[0].value 
        
    });
    
    await user.save();
} return done(null,user)
        }catch(error){
            return done(error,null)
        }
    }
    )
)
passport .serializeUser((user,done)=>{
    done(null,user);
})
passport .deserializeUser((user,done)=>{
    done(null,user);
})

//initial google auth login
// initial google auth login
app.get("/auth/google", passport.authenticate("google", { scope: ["profile", "email"] }));

// Google auth callback route
app.get("/auth/google/callback", passport.authenticate("google", {
    failureRedirect: "http://localhost:5173/login" // Redirect to login page on failure
}), (req, res) => {
    // Redirect to home page with user ID as a query parameter on successful authentication
    res.redirect(`http://localhost:5173/?userId=${req.user._id}`);
});
