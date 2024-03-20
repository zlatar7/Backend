import { Router } from "express";
import { order, user } from "../../data/mongo/manager.mongo.js";
import passCallBack from "../../middlewares/passCallback.js";

const ordersRouter = Router();

ordersRouter.get("/", passCallBack("jwt"), async (req, res, next) => {
  try {
    const options = {
      limit: req.query.limit || 20,
      page: req.query.page || 1,
      sort: { title: 1 },
      lean: true,
    };
    const usuario = await user.readByEmail(req.user.email);
    const filter = {
      user_id: usuario._id,
    };
    const all = await order.read({ filter, options });
    const arrayOrders = all.docs[0];

    return res.render("orders", { title: "MY CART", orders: arrayOrders });
  } catch (error) {
    return res.render("orders", {
      title: "MY CART",
      message: "NO ORDERS YET!",
    });
  }
});

export default ordersRouter;
