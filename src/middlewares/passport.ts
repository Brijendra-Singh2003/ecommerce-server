import "dotenv/config";
import passport from "passport";
import { Strategy } from "passport-google-oauth20";
import { AddUser } from "../db/User.js";

passport.use(
    new Strategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
            callbackURL: "/api/auth/google/callback",
        },
        function (accessToken, refreshToken, profile, done) {
            console.log(profile);
            return done(null, profile);
        }
    )
);

passport.serializeUser(async (user: any, done) => {
    const { sub, name, email, image } = user._json;
    const dbuser = await AddUser({
        name: name,
        email: email,
        id: sub,
        image: image
    });
    done(null, dbuser);
});

// Deserialize user from the session
passport.deserializeUser((user: any, done) => {
    console.log("deserializeUser: ", user);
    done(null, user);
});

export default passport;