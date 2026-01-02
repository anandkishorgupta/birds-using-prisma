import express from "express";
import { createFlock, getAllFlocks } from "../controllers/flock.controller.js";
import { authorize, protect } from "../middleware/auth.middleware.js";
const router = express.Router();

// enter flock data in specific hatchery of specific breed by admin and moderator
// --- admin or moderator login required and token role should be admin or moderator
router.post("/", protect, authorize("admin", "moderator"), createFlock);
router.get("/", protect, authorize("admin", "moderator"), getAllFlocks)
export default router;
