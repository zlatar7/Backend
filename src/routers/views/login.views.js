import { Router } from "express";

const loginRouter = Router();

loginRouter.get("/login", async(req,res,next)=>{
  try {
    return res.render("login", {title: "LOGIN"})
  } catch (error) {
    return next(error)
  }
})

export default loginRouter;