import { Router } from "express";
import order from "../../data/fs/orders.fs.js";
import propsOrders from "../../middlewares/propsOrders.js";
import propsOrdersUpdate from "../../middlewares/propsOrdersUpdate.js";

const ordersRouters = Router();


ordersRouters.get("/", async (req, res, next) => {
  try {
    const ordersArray = await order.read();
    if (ordersArray.length > 0) {
      res.status(200).json({ succes: true, response: ordersArray });
    } else {
      res.status(404).json({ success: false, message: "Not found" });
    }
  } catch (error) {
    next(error);
  }
});

ordersRouters.get("/:uid", async (req, res, next) => {
  try {
    const uid = req.params.uid;
    const obj = await order.readOne(uid);
    
    if (obj !== null) {
      res.status(200).json({ succes: true, response: obj });
    } else {
      res.status(404).json({ success: false, message: "Not found" });
    }
  } catch (error) {
    next(error);
  }
});

ordersRouters.post("/", propsOrders, async (req, res, next) => {
  try {
    const object = req.body;
    const obj = await order.create(object);
    res.status(200).json({ success: true, response: obj });
  } catch (error) {
    return next(error);
  }
});

ordersRouters.put("/:oid", propsOrdersUpdate, async (req, res, next) => {
  try {
    const oid = req.params.oid;
    const { quantity, state } = req.body;
    const obj = await order.update(oid, state, quantity);

    if (obj === `La orden con el ID: ${oid} ha sido actualizada`) {
      res.status(200).json({ succes: true, response: obj });
    } else {
      res.status(404).json({ success: false, message: "Not found" });
    }
  } catch (error) {
    next(error);
  }
});

ordersRouters.delete("/:oid", async (req, res, next) => {
  try {
    const oid = req.params.oid;
    const obj = await order.destroy(oid);

    if (obj === "Elemento eliminado") {
      res.status(200).json({ succes: true, response: obj });
    } else {
      res.status(404).json({ success: false, message: "Not found" });
    }
  } catch (error) {
    next(error);
  }
});

export default ordersRouters;
