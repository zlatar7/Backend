import { verifytoken } from "../utils/token.utils.js";

export default (req, res, next) => {
  try {
    const token = req.cookies.token;
    const userData = verifytoken(token);
    if (userData) {
      return next();
    } else {
      const error = new Error("Bad authorization");
      error.statusCode = 401;
      throw error;
    }
  } catch (error) {
    return next(error);
  }
};
