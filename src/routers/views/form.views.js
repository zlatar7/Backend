import { Router } from "express";
import isAdmin from "../../middlewares/isAdmin.js";
import passCallBack from "../../middlewares/passCallback.js";

const formRouter = Router();

formRouter.get("/", passCallBack("jwt"), isAdmin, (req, res, next) => {
  try {
    return res.render("form", { title: "ADD PRODUCT" });
  } catch (error) {
    next(error);
  }
});

export default formRouter;
