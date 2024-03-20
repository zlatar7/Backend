import CustomRouter from "./CustomRouter.js";
import apiRouter from "./api/index.routers.js"
import ViewsRouter from "./views/index.views.js";

const views = new ViewsRouter();
const viewsRouter = views.getRouter();
class IndexRouter extends CustomRouter {
  init() {
    this.use("/api", apiRouter);
    this.use("/", viewsRouter);
  }
}

const router = new IndexRouter();
export default router.getRouter();