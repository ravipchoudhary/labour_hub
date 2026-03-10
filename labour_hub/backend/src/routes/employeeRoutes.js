import express from "express";
import {
    employeeRegister,
    employeeLogin,
    getEmployeeDashboardStats,
} from "../controllers/employeeController.js";
import { protect } from "../middlewares/authMiddleware.js";
const router = express.Router();
router.post("/register", employeeRegister);
router.post("/login", employeeLogin);
router.get("/dashboard", protect, getEmployeeDashboardStats);
export default router;