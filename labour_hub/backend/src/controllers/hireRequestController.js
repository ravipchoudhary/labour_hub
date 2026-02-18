import { connection } from "../config/db.js";
import { ObjectId } from "mongodb";

export const createHireRequest = async (req, res) => {
    try {
        const db = await connection();
        const { labourId, message } = req.body;

        const employeeId = req.user?.id;
        if (!employeeId) return res.status(401).json({ message: "Unauthorized" });

        if (!labourId) return res.status(400).json({ message: "labourId required" });

        const labour = await db.collection("labour").findOne({ _id: new ObjectId(labourId) });
        if (!labour) return res.status(404).json({ message: "Labour not found" });

        const employee = await db.collection("employees").findOne({ _id: new ObjectId(employeeId) });
        if (!employee) return res.status(404).json({ message: "Employee not found" });

        const already = await db.collection("hireRequests").findOne({
            labourId: String(labourId),
            employeeId: String(employeeId),
            status: "pending",
        });

        if (already) return res.status(409).json({ message: "Already requested (pending)" });

        const doc = {
            labourId: String(labourId),
            employeeId: String(employeeId),
            message: message || "Hire request",
            status: "pending",
            createdAt: new Date(),
        };

        const result = await db.collection("hireRequests").insertOne(doc);

        return res.status(201).json({ message: "Request sent", requestId: result.insertedId });
    } catch (err) {
        console.log("createHireRequest error:", err);
        return res.status(500).json({ message: "Server error" });
    }
};

export const getLabourRequests = async (req, res) => {
    try {
        const db = await connection();
        const labourId = req.user?.id;

        const requests = await db
            .collection("hireRequests")
            .find({ labourId: String(labourId) })
            .sort({ createdAt: -1 })
            .toArray();

        return res.json(requests);
    } catch (err) {
        console.log("getLabourRequests error:", err);
        return res.status(500).json({ message: "Server error" });
    }
};

export const updateRequestStatus = async (req, res) => {
    try {
        const db = await connection();
        const labourId = req.user?.id;
        const { id } = req.params;
        const { status } = req.body;

        if (!["accepted", "rejected"].includes(status)) {
            return res.status(400).json({ message: "Invalid status" });
        }

        const request = await db.collection("hireRequests").findOne({ _id: new ObjectId(id) });
        if (!request) return res.status(404).json({ message: "Request not found" });

        if (String(request.labourId) !== String(labourId)) {
            return res.status(403).json({ message: "Not allowed" });
        }

        await db.collection("hireRequests").updateOne(
            { _id: new ObjectId(id) },
            { $set: { status, updatedAt: new Date() } }
        );

        if (status === "accepted") {
            await db.collection("labour").updateOne(
                { _id: new ObjectId(labourId) },
                { $set: { available: false } }
            );
        }

        return res.json({ message: `Request ${status}` });
    } catch (err) {
        console.log("updateRequestStatus error:", err);
        return res.status(500).json({ message: "Server error" });
    }
};