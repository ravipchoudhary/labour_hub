import express from "express";
import {
    createHireRequest,
    getLabourRequests,
    updateRequestStatus,
} from "../controllers/hireRequestController.js";

const router = express.Router();
router.post("/create", createHireRequest);
router.get("/labour/:labourId", getLabourRequests);
router.patch("/:requestId/status", updateRequestStatus);
export default router;