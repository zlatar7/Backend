import { fork } from "child_process";
import CustomRouter from "../CustomRouter.js";
import ProductsRouter from "./products.routers.js";
import OrderRouter from "./orders.routers.js";
import UserRouter from "./users.routers.js";
import SessionRouter from "./sessions.routers.js";

const product = new ProductsRouter();
const order = new OrderRouter();
const user = new UserRouter();
const session = new SessionRouter();

export default class ApiRouter extends CustomRouter {
  init() {
    this.use("/users", user.getRouter());
    this.use("/products", product.getRouter());
    this.use("/orders", order.getRouter());
    this.use("/sessions", session.getRouter());
    this.read("/sum", ["PUBLIC"], async (req, res, next) => {
      try {
       const child = fork(".src/utils/sum.utils.js")
        child.send("start")
        child.on("message", (result)=>{
          res.success200(result)
        })
      } catch (error) {
        return next(error)
      }

    });
  }
}
