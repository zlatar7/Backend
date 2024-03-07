import CustomRouter from "../CustomRouter.js";

import { product } from "../../data/mongo/manager.mongo.js";

import productsRouter from "./real.views.js"
import loginRouter from "./login.views.js";
import registerRouter from "./register.views.js"
import ordersRouter from "./orders.views.js";
import formRouter from "./form.views.js";
import logged from "../../utils/isLogged.js"

export default class ViewsRouter extends CustomRouter {
  init() {
    this.router.use("/real", productsRouter);
    this.router.use("/form", formRouter);
    this.router.use("/orders", ordersRouter);
    this.router.use("/auth", loginRouter);
    this.router.use("/auth", registerRouter);

    this.read("/", ["PUBLIC"], async (req, res, next) => {
      try {
        const sortAndPaginate = {
          limit: req.query.limit || 20,
          page: req.query.page || 1,
          sort: { title: "asc" },
          lean: true
        };
        let filter = {};
        if (req.query.title) {
          filter.title = new RegExp(req.query.title.trim(), "i");
        }
        if (req.query.sort === "desc") {
          sortAndPaginate.sort.title = "desc";
        }
        
        const token = req.cookies.token
        const usuario = logged(token)

        const prods = await product.read({ filter, sortAndPaginate })
        return res.render("index", {
          products: prods.docs,
          next: prods.nextPage,
          prev: prods.prevPage,
          title: "INDEX",
          filter: req.query.title,
          role: usuario.role
        });
      } catch (error) {
        next(error);
      }
    });
  }
}