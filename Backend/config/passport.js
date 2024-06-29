import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { createJWT } from '../utils/tokenUtils.js';
import UserModel from '../models/UserModels.js';
import dotenv from 'dotenv';

dotenv.config();

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: 'callback',
    scope: ["profile", "email"]
},
async (accessToken, refreshToken, profile, done) => {
    try {
        let user = await UserModel.findOne({ googleId: profile.id });

        if (!user) {
            user = new UserModel({
                googleId: profile.id,
                name: profile.displayName,
                email: profile.emails[0].value,
            });
            await user.save();
        }

        const token = createJWT({ id: user._id, googleId: user.googleId });
        return done(null, { token, id: user._id, name: user.name });
    } catch (error) {
        return done(error, false);
    }
}));

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});

export default passport;