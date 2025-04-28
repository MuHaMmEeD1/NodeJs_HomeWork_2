import express from "express";
import {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  getCurrentUser,
} from "../controllers/user.controller.js";
import { protectRoute } from "../middleware/protectRoute.js";
import { checkAdmin } from "../middleware/checkAdmin.js";

const router = express.Router();

// GET all users (admin only)
router.get("/", getAllUsers);

// GET user by ID (admin or same user)
router.get("/user/:id", getUserById);

// GET current user profile (protected)
router.get("/user/me", protectRoute, getCurrentUser);

// POST create new user (public)
router.post("/add/", protectRoute, createUser);

// PUT update user (protected - only same user or admin)
router.put("/edit/:id", protectRoute, updateUser);

// DELETE user (admin only)
router.delete("/delete/:id", protectRoute, checkAdmin, deleteUser);

export default router;
