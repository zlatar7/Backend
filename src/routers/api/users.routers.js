import propsUsers from "../../middlewares/propsUsers.js";
import CustomRouter from "../CustomRouter.js";
import { create, destroy, read, readOne, update } from "../../controllers/users.controller.js";

class UsersRouter extends CustomRouter {
  init() {
    this.read("/", ["ADMIN"], read);
    this.read("/:uid", ["USER", "PREM"], readOne);
    this.create("/", ["PUBLIC"], propsUsers, create);
    this.update("/:uid", ["USER", "PREM"], propsUsers, update);
    this.destroy("/:uid", ["USER", "PREM"], destroy);
  }
}

const usersRouter = new UsersRouter();
export default usersRouter.getRouter();