import { Router } from "express";
import usersRouter from "./users.router.js";
import productsRouter from "./products.routers.js";
import ordersRouters from "./orders.routers.js";

const apiRouter = Router()

apiRouter.use("/users",usersRouter)
apiRouter.use("/products",productsRouter)
apiRouter.use("/orders", ordersRouters)

export default apiRouter;