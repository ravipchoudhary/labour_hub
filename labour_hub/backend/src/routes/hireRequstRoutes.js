import express from "express";
import { protect } from "../middlewares/authMiddleware.js";
import {
    createHireRequest,
    getLabourRequests,
    updateRequestStatus,
} from "../controllers/hireRequestController.js";

const router = express.Router();

router.post("/create", protect, createHireRequest);

router.get("/labour", protect, getLabourRequests);

router.patch("/:id/status", protect, updateRequestStatus);

export default router;