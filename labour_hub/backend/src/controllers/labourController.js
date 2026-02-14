import bcrypt from "bcryptjs";
import { connection } from "../config/db.js";
import jwt from "jsonwebtoken";
import { ObjectId } from "mongodb";

// ================= REGISTER =================
export const registerLabour = async (req, res) => {
    try {
        const db = await connection();

        console.log("BODY DATA:", req.body);

        const newLabour = {
            name: req.body.name || "",
            phone: req.body.phone || "",
            password: await bcrypt.hash(req.body.password, 10),
            email: req.body.email || "",
            skills: req.body.skills || [],
            location: req.body.location || "",
            price: Number(req.body.price) || 0,
            available: true,
            createdAt: new Date(),
        };

        await db.collection("labour").insertOne(newLabour);

        res.status(201).json({ message: "Registered successfully" });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// ================= LOGIN =================
export const loginLabour = async (req, res) => {
    try {
        const { phone, password } = req.body;

        const db = await connection();

        const labour = await db.collection("labour").findOne({ phone });

        if (!labour) {
            return res.status(400).json({ message: "Labour not found" });
        }

        const isMatch = await bcrypt.compare(password, labour.password);

        if (!isMatch) {
            return res.status(400).json({ message: "Invalid password" });
        }

        const token = jwt.sign(
            { id: labour._id },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        res.json({
            message: "Login successful",
            token,
            labour
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// ================= GET ALL =================
export const getAllLabours = async (req, res) => {
    try {
        const db = await connection();
        const labours = await db.collection("labour").find().toArray();
        res.json(labours);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// ================= PROFILE =================
export const getLabourProfile = async (req, res) => {
    try {
        const db = await connection();

        const labour = await db.collection("labour").findOne({
            _id: new ObjectId(req.user.id)
        });

        if (!labour) {
            return res.status(404).json({ message: "Labour not found" });
        }

        delete labour.password;

        res.json(labour);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// ================= UPDATE AVAILABILITY =================
export const updateAvailability = async (req, res) => {
    try {
        const db = await connection();
        const { available } = req.body;

        await db.collection("labour").updateOne(
            { _id: new ObjectId(req.user.id) },
            { $set: { available } }
        );

        res.json({ message: "Availability updated", available });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


// ================= DASHBOARD =================
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
