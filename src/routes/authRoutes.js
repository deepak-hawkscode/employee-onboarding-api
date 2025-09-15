import { Router } from "express";
import { register, login } from "../controllers/authController.js";

const router = Router();

// Register new employee
router.post("/register", register);

// Login employee
router.post("/login", login);

export default router;
