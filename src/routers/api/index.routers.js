import { fork } from "child_process";
import CustomRouter from "../CustomRouter.js";
import usersRouter from "./users.routers.js";
import productsRouter from "./products.routers.js";
import ordersRouter from "./orders.routers.js";
import sessionsRouter from "./sessions.routers.js";

class ApiRouter extends CustomRouter {
  init() {
    this.use("/users", usersRouter);
    this.use("/products", productsRouter);
    this.use("/orders", ordersRouter);
    this.use("/sessions", sessionsRouter);
    this.read("/sum", ["PUBLIC"], async (req, res, next) => {
      try {
        const child = fork(".src/utils/sum.utils.js");
        child.send("start");
        child.on("message", (result) => {
          res.success200(result);
        });
      } catch (error) {
        return next(error);
      }
    });
  }
}

const apiRouter = new ApiRouter();
export default apiRouter.getRouter();