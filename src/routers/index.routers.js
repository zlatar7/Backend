import { Router } from "express";
import apiRouter from "./api/index.routers.js";

const router = Router()

router.use("/api",apiRouter)

export default router