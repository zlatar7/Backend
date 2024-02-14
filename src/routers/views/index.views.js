import { Router } from "express";
import productsRouter from "./real.views.js";
import formRouter from "./form.views.js";
import registerRouter from "./register.views.js";
// import product from "../../data/fs/products.fs.js";
import { product } from "../../data/mongo/manager.mongo.js";

const viewsRouter = Router();

viewsRouter.get("/", async (req, res, next) => {
  try {
    const sortAndPaginate = {
      limit: req.query.limit || 20,
      page: req.query.page || 1,
      sort: { title: "asc" },
    };
    const filter = {};
    if (req.query.title === "desc") {
      sortAndPaginate.sort.title = "desc";
    }

    const prods = await product.read({ filter, sortAndPaginate });
    const arrayProds = prods.docs.map((item) => {
      return {
        title: item.title,
        photo: item.photo,
        price: item.price,
        stock: item.stock,
      };
    });
    return res.render("index", { products: arrayProds, title: "INDEX" });
  } catch (error) {
    next(error);
  }
});

viewsRouter.use("/real", productsRouter);
viewsRouter.use("/form", formRouter);
viewsRouter.use("/register", registerRouter);

export default viewsRouter;
