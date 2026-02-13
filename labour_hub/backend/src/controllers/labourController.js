import bcrypt from "bcryptjs";
import { connection } from "../config/db.js";
import Labour from "../models/Labour.js";
import jwt from "jsonwebtoken";

export const updateAvailability = async (req, res) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) return res.status(401).json({ message: "Unauthorized" });

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const labour = await Labour.findById(decoded.id);
        if (!labour) return res.status(404).json({ message: "Labour not found" });

        labour.available = req.body.available; // toggle value
        await labour.save();

        res.json({ message: "Availability updated", available: labour.available });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
export const getLabourProfile = async (req, res) => {
    try {
        const labour = await Labour.findById(req.user.id).select("-password");

        if (!labour) {
            return res.status(404).json({ message: "Labour not found" });
        }

        res.json(labour);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const registerLabour = async (req, res) => {
    try {
        const { fullName, email, password } = req.body;
        const db = await connection();
        const existing = await db.collection("labour").findOne({ phone });
        if (existing) {
            return res.status(400).json({ message: "Labour already exists" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        await db.collection("labour").insertOne({
            name: fullName,
            phone,
            email,
            password: hashedPassword,
            role: "labour",
            available: true,
            createdAt: new Date()
        });
        res.status(201).json({ message: "Labour registered successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const getAllLabours = async (req, res) => {
    try {
        const db = await connection();
        const labours = await db.collection("labour").find().toArray();
        res.json(labours);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
export const getDashboardStats = async (req, res) => {
    try {
        const db = await connection();
        const labours = await db.collection("labour").find().toArray();
        const workersContacted = labours.length;
        const activeSearches = labours.filter(l => l.available).length;
        const workersHired = labours.filter(l => !l.available).length;
        res.json({ workersContacted, activeSearches, workersHired });
    } catch (err) {
        res.status(500).json({ message: "Failed to get dashboard stats" });
    }
};