import { Router } from "express";
import product from "../../data/fs/products.fs.js";
import propsProducts from "../../middlewares/propsProducts.js";

const productsRouter = Router();

productsRouter.get("/", async (req, res, next) => {
  try {
    const arrayProducts = await product.read();

    if (arrayProducts.length > 0) {
      res.status(200).json({ success: true, response: arrayProducts });
    } else {
      res.status(404).json({ success: false, message: "Not found" });
    }
  } catch (error) {
    return next(error);
  }
});

productsRouter.get("/:pid", async (req, res, next) => {
  try {
    const id = parseInt(req.params.pid);
    const obj = await product.readOne(id);

    if (obj !== null) {
      res.status(200).json({ success: true, response: obj });
    } else {
      res.status(404).json({ success: false, message: "Not found" });
    }
  } catch (error) {
    return next(error);
  }
});

productsRouter.post("/", propsProducts, async (req, res, next) => {
  try {
    const prod = req.body;
    const obj = await product.create(prod);
    res.status(200).json({ success: true, response: obj });
  } catch (error) {
    return next(error);
  }
});

productsRouter.put("/:pid",propsProducts, async (req, res, next) => {
  try {
    const pid = req.params.pid;
    const prod = req.body;
    const obj = await product.update(pid, prod);
    
    if (obj == `El producto con el ID: ${pid} ha sido actualizado`) {
      res.status(200).json({ success: true, response: obj });
    } else {
      res.status(404).json({ success: false, message: obj });
    }
  } catch (error) {
    next(error);
  }
});

productsRouter.delete("/:pid", async (req, res) => {
  try {
    const prod = req.params.pid;
    const obj = await product.destroy(prod);

    if (obj !== "No hay elementos con el ID ingresado") {
      res.status(200).json({ success: true, response: obj });
    } else {
      res.status(404).json({ success: false, message: obj });
    }
  } catch (error) {
    return next(error);
  }
});

export default productsRouter;