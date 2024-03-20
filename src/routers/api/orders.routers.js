import propsOrders from "../../middlewares/propsOrders.js";
import propsOrdersUpdate from "../../middlewares/propsOrdersUpdate.js";
import CustomRouter from "../CustomRouter.js";
import { read, readOne, create, update, report, destroy } from "../../controllers/orders.controller.js";

class OrdersRouter extends CustomRouter {
  init() {
    this.read("/total/:uid", ["ADMIN"], report);
    this.read("/", ["USER", "PREM"], read);
    this.read("/:oid", ["USER", "PREM"], readOne);
    this.create("/", ["USER", "PREM"], propsOrders, create);
    this.update("/:oid", ["USER", "PREM"], propsOrdersUpdate, update);
    this.destroy("/:oid", ["USER", "PREM"], destroy);
  }
}

const ordersRouter = new OrdersRouter();
export default ordersRouter.getRouter();
