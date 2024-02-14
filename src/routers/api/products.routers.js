import { Router } from "express";
// import product from "../../data/fs/products.fs.js";
import { product } from "../../data/mongo/manager.mongo.js";
import propsProducts from "../../middlewares/propsProducts.js";

const productsRouter = Router();

productsRouter.get("/", async (req, res, next) => {
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

    return res.json({ statusCode: 200, response: arrayProducts });
  } catch (error) {
    return next(error);
  }
});

productsRouter.get("/:pid", async (req, res, next) => {
  try {
    const { pid } = req.params;
    const obj = await product.readOne(pid);

    return res.json({ statusCode: 200, response: obj });
  } catch (error) {
    return next(error);
  }
});

productsRouter.post("/", propsProducts, async (req, res, next) => {
  try {
    const prod = req.body;
    const obj = await product.create(prod);
    res.json({ statusCode: 201, response: obj });
  } catch (error) {
    return next(error);
  }
});

productsRouter.put("/:pid", propsProducts, async (req, res, next) => {
  try {
    const { pid } = req.params;
    const prod = req.body;
    const obj = await product.update(pid, prod);

    return res.json({ statusCode: 200, response: obj });
  } catch (error) {
    next(error);
  }
});

productsRouter.delete("/:pid", async (req, res) => {
  try {
    const { pid } = req.params;
    const obj = await product.destroy(pid);

    return res.json({ statusCode: 200, response: obj });
  } catch (error) {
    return next(error);
  }
});

export default productsRouter;
