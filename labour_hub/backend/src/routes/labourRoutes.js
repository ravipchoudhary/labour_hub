import express from "express";
import { connection } from "../config/db.js";
import { ObjectId } from "mongodb";

const router = express.Router();

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

export default router;   