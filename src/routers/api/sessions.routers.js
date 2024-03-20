import has8char from "../../middlewares/has8char.js";
import passport from "../../middlewares/passport.js";
import passCallBack from "../../middlewares/passCallback.js";
import CustomRouter from "../CustomRouter.js";

export default class SessionRouter extends CustomRouter {
  init() {

    //  REGISTER
    this.create(
      "/register",
      ["PUBLIC"],
      has8char,
      passCallBack("register"),
      async (req, res, next) => {
        try {
          return res.success201("Registered!");
        } catch (error) {
          return next(error);
        }
      }
    );
    // LOGIN
    this.create(
      "/login",
      ["PUBLIC"],
      passCallBack("login"),
      async (req, res, next) => {
        try {
          return res
            .cookie("token", req.token, {
              maxAge: 7 * 24 * 60 * 60 * 1000,
              httpOnly: true,
            })
            .success200("Logged in!");
        } catch (error) {
          return next(error);
        }
      }
    );
    // SIGNOUT
    this.create("/signout", ["USER","PREMIUM", "ADMIN"], async (req, res, next) => {
      try {
        return res.clearCookie("token").success200("Signed out!");
      } catch (error) {
        return next(error);
      }
    });

    // SIGNOUT/CB
    this.read("/signout/cb", ["PUBLIC"], (req, res, next) => {
      try {
        return res.error400("Already done!");
      } catch (error) {
        return next(error);
      }
    });

    //BADAUTH
    this.read("/badauth", ["PUBLIC"], (req, res, next) => {
      try {
        return res.error401();
      } catch (error) {
        return next(error);
      }
    });

    // GOOGLE
    this.create(
      "/google",
      ["PUBLIC"],
      passport.authenticate("google", { scope: ["email", "profile"] })
    );

    //GOOGLE-CALLBACK
    this.read(
      "/google/callback",
      ["PUBLIC"],
      passport.authenticate("google", {
        session: false,
        failureRedirect: "/api/sessions/badauth",
      }),
      async (req, res, next) => {
        try {
          return res.success200("Logged with Google!");
        } catch (error) {
          return next(error);
        }
      }
    );
    //GITHUB
    this.create(
      "/github",
      ["PUBLIC"],
      passport.authenticate("github", { scope: ["user:email"] })
    );
    //GITHUB-CALLBACK
    this.read(
      "/github/callback",
      ["PUBLIC"],
      passport.authenticate("github", {
        session: false,
        failureRedirect: "/api/sessions/badauth",
      }),
      async (req, res, next) => {
        try {
          return res.success200("Logged with Github!");
        } catch (error) {
          return next(error);
        }
      }
    );
  }
}
