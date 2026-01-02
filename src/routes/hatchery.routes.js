import express from "express";
import { createHatchery, deleteHatchery, getAllHatcheries, getHatcheriesWithFlocks, getHatcheryById, updateHatchery } from "../controllers/hatchery.controller.js";
import { authorize, protect } from "../middleware/auth.middleware.js";
const router = express.Router();

// admin or moderator can create hatchery account
router.post("/", protect, authorize("admin", "moderator"), createHatchery);
// get all hatcheries - admin and moderator only
router.get("/", protect, authorize("admin", "moderator"), getAllHatcheries);
// get all hatcheries with their flocks and breed details - admin and moderator only
router.get("/flocks", protect, authorize("admin", "moderator"), getHatcheriesWithFlocks);
// get hatchery by id - admin, moderator 
router.get("/:id", protect, authorize("admin", "moderator"), getHatcheryById);
// update hatchery by id - admin and moderator only
router.put("/:id", protect, authorize("admin", "moderator"), updateHatchery);
// delete hatchery by id - admin only
router.delete("/:id", protect, authorize("admin"), deleteHatchery);




export default router;