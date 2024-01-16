import { Router } from "express";
import productsRouter from "./real.views.js";
import formRouter from "./form.views.js";
import registerRouter from "./register.views.js";
import product from "../../data/fs/products.fs.js";

const viewsRouter = Router();

viewsRouter.get("/", async (req, res, next) => {
  try {
    const prods = await product.read();
    return res.render("index", { products: prods, title: "INDEX" });
  } catch (error) {
    next(error);
  }
});

viewsRouter.use("/real", productsRouter);
viewsRouter.use("/form", formRouter);
viewsRouter.use("/register", registerRouter);

export default viewsRouter;
