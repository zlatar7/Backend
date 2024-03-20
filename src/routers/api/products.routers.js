import CustomRouter from "../CustomRouter.js";
import propsProducts from "../../middlewares/propsProducts.js";
import isAdmin from "../../middlewares/isAdmin.js";
import passCallback from "../../middlewares/passCallback.js";
import { create, destroy, read, readOne, update } from "../../controllers/products.controller.js";

class ProductsRouter extends CustomRouter {
  init() {
    this.read("/", ["PUBLIC"], read);
    this.read("/:pid", ["PUBLIC"], readOne);
    this.create("/", ["ADMIN", "PREM"], passCallback("jwt"), isAdmin, create);
    this.update("/:pid", ["ADMIN", "PREM"], propsProducts, update);
    this.destroy("/:pid", ["ADMIN", "PREM"], destroy);
  }
}

const productsRouter = new ProductsRouter();
export default productsRouter.getRouter();
