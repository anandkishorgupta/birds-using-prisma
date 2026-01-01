import express from "express";
import { createBreed, deleteBreed, getAllBreeds, getBreedById, updateBreed } from "../controllers/breed.controller.js";
import { authorize, protect } from "../middleware/auth.middleware.js";
const router = express.Router();

// enter breed standard data by admin only
// --- admin login required and token role should be admin
router.post("/", protect, authorize("admin"), createBreed);

router.get("/", protect, authorize("admin"), getAllBreeds);
router.get("/:id", protect, authorize("admin"), getBreedById);

// update breed by id - admin only
router.put("/:id", protect, authorize("admin"), updateBreed);

// delete breed by id - admin only
router.delete("/:id", protect, authorize("admin"), deleteBreed);

export default router;
