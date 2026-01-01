import express from "express";
import { createUser, login } from "../controllers/auth.controller.js";
import { protect } from "../middleware/auth.middleware.js";
const router = express.Router();
// user login
router.post("/login", login);

// admin create moderator or moderator create hatchery member account
router.post("/register", protect, createUser);

export default router;