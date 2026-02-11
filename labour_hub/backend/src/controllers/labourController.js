import { connection } from "../config/db.js";
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
        console.error(err);
        res.status(500).json({ message: "Failed to get dashboard stats" });
    }
};