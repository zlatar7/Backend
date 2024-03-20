import has8char from "../../middlewares/has8char.js";
import passport from "../../middlewares/passport.js";
import passCallBack from "../../middlewares/passCallback.js";
import CustomRouter from "../CustomRouter.js";
import { badauth, github, google, login, register, signout, signoutCb } from "../../controllers/sessions.controller.js";

class SessionsRouter extends CustomRouter {
  init() {
    this.create("/register", ["PUBLIC"], has8char, passCallBack("register"), register);
    this.create("/login", ["PUBLIC"], passCallBack("login"), login);
    this.create("/signout", ["USER", "PREMIUM", "ADMIN"], signout);
    this.read("/signout/cb", ["PUBLIC"], signoutCb);
    this.create("/google", ["PUBLIC"], passport.authenticate("google", { scope: ["email", "profile"] }));
    this.read("/google/callback", ["PUBLIC"], passport.authenticate("google", {session: false, failureRedirect: "/api/sessions/badauth"}), google);
    this.create("/github", ["PUBLIC"], passport.authenticate("github", { scope: ["email", "profile"] }));
    this.read("/github/callback", ["PUBLIC"], passport.authenticate("github", {session: false, failureRedirect: "/api/sessions/badauth"}), github);
    this.read("/badauth", ["PUBLIC"], badauth);
  }
}

let sessionsRouter = new SessionsRouter();
export default sessionsRouter.getRouter();