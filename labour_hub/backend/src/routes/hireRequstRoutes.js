import express from "express";
import {
    createHireRequest,
    getHireStats,
    getPendingHireRequests,
    updateHireRequestStatus,
} from "../controllers/hireRequestController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/create", protect, createHireRequest);
router.get("/stats", protect, getHireStats);
router.get("/pending", protect, getPendingHireRequests);
router.patch("/:id/status", protect, updateHireRequestStatus);

export default router;