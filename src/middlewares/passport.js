import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as GoogleStrategy } from "passport-google-oauth2";
import { Strategy as GithubStrategy } from "passport-github2";
import { ExtractJwt, Strategy as JwtStrategy } from "passport-jwt";
import { createHash, verifyHash } from "../utils/hash.utils.js";
import { createToken } from "../utils/token.utils.js";
import { user } from "../data/mongo/manager.mongo.js";
const {GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GITHUB_CLIENT_SECRET, GITHUB_CLIENT_ID, SECRET_KEY,} = process.env;

passport.use(
  "register",
  new LocalStrategy(
    { passReqToCallback: true, usernameField: "email" },
    async (req, email, password, done) => {
      try {
        let one = await user.readByEmail(email);
        if (!one) {
          let data = req.body;
          data.password = createHash(password);
          let usuario = await user.create(data);
          return done(null, usuario);
        } else {
          return done(null, false, {
            message: "User already exists",
            statusCode: 400,
          });
        }
      } catch (error) {
        return done(error);
      }
    }
  )
);

passport.use(
  "login",
  new LocalStrategy(
    { passReqToCallback: true, usernameField: "email" },
    async (req, email, password, done) => {
      try {
        const usuario = await user.readByEmail(email);
        if (usuario && verifyHash(password, usuario.password)) {
          const token = createToken({ email, role: usuario.role });
          req.token = token;
          return done(null, usuario);
        } else {
          return done(null, false, { message: "Bad auth" });
        }
      } catch (error) {
        return done(error);
      }
    }
  )
);

passport.use(
  "google",
  new GoogleStrategy(
    {
      passReqToCallback: true,
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:8000/api/sessions/google/callback",
    },
    async (req, accessToken, refreshToken, profile, done) => {
      try {
        let usuario = await user.readByEmail(profile.id + "@gmail.com");
        if (!usuario) {
          usuario = {
            email: profile.id + "@gmail.com",
            name: profile.name.givenName,
            lastName: profile.name.familyName,
            photo: profile.coverPhoto,
            password: createHash(profile.id),
          };
          usuario = await user.create(usuario);
        }
        req.session.email = usuario.email;
        req.session.role = usuario.role;
        return done(null, usuario);
      } catch (error) {
        return done(error);
      }
    }
  )
);

passport.use(
  "github",
  new GithubStrategy(
    {
      passReqToCallback: true,
      clientID: GITHUB_CLIENT_ID,
      clientSecret: GITHUB_CLIENT_SECRET,
      callbackURL: "http://localhost:8000/api/sessions/github/callback",
    },
    async (req, accessToken, refreshToken, profile, done) => {
      try {
        let usuario = await user.readByEmail(profile.id + "@github.com");
        if (!usuario) {
          usuario = {
            email: profile.id + "@github.com",
            name: profile.username,
            photo: profile._json.avatar_url,
            password: createHash(profile.id),
          };
          usuario = await user.create(usuario);
        }
        req.session.email = usuario.email;
        req.session.role = usuario.role;
        return done(null, usuario);
      } catch (error) {
        return done(error);
      }
    }
  )
);

passport.use(
  "jwt",
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req) => req?.cookies["token"],
      ]),
      secretOrKey: SECRET_KEY,
    },
    async (payload, done) => {
      try {
        const usuario = await user.readByEmail(payload.email);
        if (usuario) {
          usuario.password = null;
          return done(null, usuario);
        } else {
          return done(null, false, { message: "Bad Authentication" });
        }
      } catch (error) {
        return done(error);
      }
    }
  )
);

export default passport;
