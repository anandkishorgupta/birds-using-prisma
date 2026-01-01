import express from "express";
import { createHatchery, getAllHatcheries, getHatcheryById } from "../controllers/hatchery.controller.js";
import { authorize, protect } from "../middleware/auth.middleware.js";
const router = express.Router();

// admin or moderator can create hatchery account
router.post("/", protect, authorize("admin", "moderator"), createHatchery);
// get all hatcheries - admin and moderator only
router.get("/", protect, authorize("admin", "moderator"), getAllHatcheries);
// get hatchery by id - admin, moderator 
router.get("/:id", protect, authorize("admin", "moderator"), getHatcheryById);

export default router;