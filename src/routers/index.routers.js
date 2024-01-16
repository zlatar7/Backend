import { Router } from "express";
import apiRouter from "./api/index.routers.js";
import viewsRouter from "./views/index.views.js";

const router = Router()

router.use("/api",apiRouter)
router.use("/",viewsRouter)

export default router