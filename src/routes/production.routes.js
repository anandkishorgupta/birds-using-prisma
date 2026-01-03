import express from "express";

import { getProductionReport, upsertDailyProduction } from "../controllers/production.controller.js";
import { authorize, protect } from "../middleware/auth.middleware.js";


const router = express.Router();

router.post("/", protect, authorize("admin", "moderator"), upsertDailyProduction);

router.get("/report", protect, authorize("admin", "moderator"), getProductionReport);



export default router;
