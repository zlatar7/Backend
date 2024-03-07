import CustomRouter from "./CustomRouter.js";
import ApiRouter from "./api/index.routers.js";
import ViewsRouter from "./views/index.views.js";

const api = new ApiRouter(); //instancia de la clase
const apiRouter = api.getRouter(); //enrutador
const views = new ViewsRouter();
const viewsRouter = views.getRouter();
export default class IndexRouter extends CustomRouter {
  init() {
    this.use("/api", apiRouter);
    this.use("/", viewsRouter);
  }
}