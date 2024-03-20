class SessionsController {
  register = async (req, res, next) => {
    try {
      return res.success201("Registered!");
    } catch (error) {
      return next(error);
    }
  };
  login = async (req, res, next) => {
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
  };
  google = async (req, res, next) => {
    try {
      return res.success200("Logged with Google!");
    } catch (error) {
      return next(error);
    }
  };
  github = async (req, res, next) => {
    try {
      return res.success200("Logged with Github!");
    } catch (error) {
      return next(error);
    }
  };
  signout = async (req, res, next) => {
    try {
      return res.clearCookie("token").success200("Signed out!");
    } catch (error) {
      return next(error);
    }
  };
  signoutCb = (req, res, next) => {
    try {
      return res.error400("Already done!");
    } catch (error) {
      return next(error);
    }
  };
  badauth = (req, res, next) => {
    try {
      return res.error401();
    } catch (error) {
      return next(error);
    }
  };
}

export default SessionsController;
const controller = new SessionsController();
const { register, login, google, github, signout, signoutCb, badauth } = controller;
export { register, login, google, github, signout, signoutCb, badauth };
