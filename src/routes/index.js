import { Router } from "express";
import authRoutes from "./authRoutes.js";
import employeeRoutes from "./employeeRoutes.js";
import documentRoutes from "./documentRoutes.js";

const router = Router();
router.use("/auth", authRoutes);
router.use("/employee", employeeRoutes);
router.use("/documents", documentRoutes);

export default router;
