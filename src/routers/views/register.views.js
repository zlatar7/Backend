import { Router } from "express";

const registerRouter = Router();

registerRouter.get("/", (req, res, next) => {
  try {
    return res.render("register", { title: "REGISTER" });
  } catch (error) {
    next(error);
  }
});

export default registerRouter;
