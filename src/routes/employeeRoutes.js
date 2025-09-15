import express from "express";
import {
  getEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
  getProfile
} from "../controllers/employeeController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();
router.get("/profile", protect, getProfile); 
router.get("/", protect, getEmployees);
router.get("/:id", protect, getEmployeeById);
router.put("/:id", protect, updateEmployee);
router.delete("/:id", protect, deleteEmployee);

export default router;
