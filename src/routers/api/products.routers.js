import CustomRouter from "../CustomRouter.js";
import { Types } from "mongoose";
// import product from "../../data/fs/products.fs.js";
import { product } from "../../data/mongo/manager.mongo.js";
import propsProducts from "../../middlewares/propsProducts.js";
import isAdmin from "../../middlewares/isAdmin.js";
import passCallback from "../../middlewares/passCallback.js";

export default class ProductsRouter extends CustomRouter {
  init() {
    this.read("/", ["PUBLIC"], async (req, res, next) => {
      try {
        const sortAndPaginate = {
          limit: req.query.limit || 20,
          page: req.query.page || 1,
          sort: { title: 1 },
        };
        const filter = {};

        if (req.query.title === "desc") {
          sortAndPaginate.sort.title = "desc";
        }
        const arrayProducts = await product.read({ filter, sortAndPaginate });

        return res.success200(arrayProducts);
      } catch (error) {
        return next(error);
      }
    });

    this.read("/:pid", ["PUBLIC"], async (req, res, next) => {
      try {
        const { pid } = req.params;
        const isValidID = Types.ObjectId.isValid(pid);

        if (isValidID) {
          const obj = await product.readOne(pid);

          return res.success200(obj);
        } else {
          res.error404();
        }
      } catch (error) {
        return next(error);
      }
    });

    this.create(
      "/",
      ["ADMIN", "PREM"],
      passCallback("jwt"),
      isAdmin,
      async (req, res, next) => {
        try {
          const data = req.body;
          const response = await product.create(data);
          return res.success201(response);
        } catch (error) {
          return next(error);
        }
      }
    );

    this.update(
      "/:pid",
      ["ADMIN", "PREM"],
      propsProducts,
      async (req, res, next) => {
        try {
          const { pid } = req.params;
          const isValidID = Types.ObjectId.isValid(pid);

          if (isValidID) {
            const prod = req.body;
            const obj = await product.update(pid, prod);

            return res.json({ statusCode: 200, response: obj });
          } else {
            res.error404();
          }
        } catch (error) {
          next(error);
        }
      }
    );

    this.destroy("/:pid", ["ADMIN", "PREM"], async (req, res) => {
      try {
        const { pid } = req.params;
        const isValidID = Types.ObjectId.isValid(pid);

        if (isValidID) {
          const obj = await product.destroy(pid);

          return res.json({ statusCode: 200, response: obj });
        } else {
          res.error404();
        }
      } catch (error) {
        return next(error);
      }
    });
  }
}
