import express from "express";
import { connection } from "../config/db.js";
import { ObjectId } from "mongodb";
import { getDashboardStats, getLabourProfile } from "../controllers/labourController.js";
import { registerLabour } from "../controllers/labourController.js";
import { loginLabour } from "../controllers/labourController.js";
import { verifyAdminToken} from "../middlewares/authMiddleware.js";
import { updateAvailability } from "../controllers/labourController.js";
import {protect} from "../middlewares/authMiddleware.js";
const router = express.Router();

router.patch("/availability",protect,updateAvailability);
router.get("/profile", protect,getLabourProfile);
router.get("/dashboard", getDashboardStats);
router.get("/", async (req, res) => {
    try {
        const db = await connection();
        const labours = await db.collection("labour").find({}).toArray();
        res.json(labours);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


router.get("/:id", async (req, res) => {
    try {
        const db = await connection();
        const labour = await db.collection("labour").findOne({
            _id: new ObjectId(req.params.id)

        });


        if (!labour) {
            return res.status(404).json({ message: "Labour not found" });
        }


        res.json(labour);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
router.post("/register", registerLabour);
router.post("/login", loginLabour);
router.post("/", async (req, res) => {
    try {
        const db = await connection();


        const newLabour = {
            name: req.body.name,
            phone: req.body.phone,
            skill: req.body.skill,
            available: true,
            location: req.body.location,
            price: req.body.price,
            createdAt: new Date()
        };


        const result = await db.collection("labour").insertOne(newLabour);


        res.status(201).json({
            message: "Labour added successfully",
            labourId: result.insertedId
        });


    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
router.patch("/:id/availability", async (req, res) => {
    try {
        const db = await connection();
        const { available } = req.body;


        const result = await db.collection("labour").updateOne(
            { _id: new ObjectId(req.params.id) },
            { $set: { available } }
        );


        if (result.matchedCount === 0) {
            return res.status(404).json({ message: "Labour not found" });
        }


        res.json({
            message: "Availability updated successfully",
            available
        });


    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
router.post("/:id/review", async (req, res) => {
    try {
        const db = await connection();
        const { rating, comment, name } = req.body;


        const labourId = req.params.id;


        const labour = await db.collection("labour").findOne({ _id: new ObjectId(labourId) });


        if (!labour) {
            return res.status(404).json({ message: "Labour not found" });
        }


        const reviews = labour.reviews || [];


        reviews.push({ rating, comment, name, createdAt: new Date() });


        await db.collection("labour").updateOne(
            { _id: new ObjectId(labourId) },
            { $set: { reviews } }
        );


        res.status(200).json({ message: "Review added successfully", reviews });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Failed to add review" });
    }
});
router.get("/jobs", protect, async (req, res) => {
    try {
        const db = await connection();

        // Make sure token me id store hai
        const labourId = req.user.id;

        const jobs = await db.collection("jobs")
            .find({ labourId: labourId })
            .toArray();

        const completedJobs = jobs.filter(job => job.status === "completed");
        const pendingJobs = jobs.filter(job => job.status === "pending");
        const rejectedJobs = jobs.filter(job => job.status === "rejected");

        res.json({
            completedJobs,
            pendingJobs,
            rejectedJobs
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
export default router;
