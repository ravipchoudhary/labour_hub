import { ObjectId } from "mongodb";
import { connection } from "../config/db.js";

export const getHireStats = async (req, res) => {
    try {
        const db = await connection();
        const labourId = new ObjectId(req.user.id);

        const rows = await db.collection("hireRequests").aggregate([
            { $match: { labourId } },
            { $group: { _id: "$status", count: { $sum: 1 } } }
        ]).toArray();

        const stats = { pending: 0, accepted: 0, rejected: 0 };

        for (const r of rows) {
            if (r._id === "pending") stats.pending = r.count;
            if (r._id === "accepted") stats.accepted = r.count;
            if (r._id === "rejected") stats.rejected = r.count;
        }

        return res.json({
            pending: stats.pending,
            accepted: stats.accepted,
            rejected: stats.rejected,
            totalRequests: stats.pending + stats.accepted + stats.rejected
        });
    } catch (err) {
        return res.status(500).json({ message: "Server error" });
    }
};

export const createHireRequest = async (req, res) => {
    try {
        const db = await connection();

        const employeeId = req.user?.id;
        const { labourId, message } = req.body;

        if (!labourId) return res.status(400).json({ message: "labourId required" });
        if (!employeeId) return res.status(401).json({ message: "Unauthorized" });

        const labourObjectId = new ObjectId(labourId);
        const employeeObjectId = new ObjectId(employeeId);

        const alreadyPending = await db.collection("hireRequests").findOne({
            labourId: labourObjectId,
            employeeId: employeeObjectId,
            status: "pending",
        });

        if (alreadyPending) {
            return res.status(409).json({
                message: "Request already sent. Please wait for worker response.",
            });
        }

        const doc = {
            labourId: labourObjectId,
            employeeId: employeeObjectId,
            message: message || "",
            status: "pending",
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        await db.collection("hireRequests").insertOne(doc);

        return res.status(201).json({ message: "Hire request sent", request: doc });
    } catch (err) {
        console.log("createHireRequest error:", err);
        return res.status(500).json({ message: "Server error" });
    }
};
export const getPendingHireRequests = async (req, res) => {
    try {
        const db = await connection();

        const labourId = req.user?.id;
        if (!labourId) {
            return res.status(401).json({ message: "Unauthorized (token missing)" });
        }

        const requests = await db
            .collection("hireRequests")
            .aggregate([
                { $match: { labourId: new ObjectId(labourId), status: "pending" } },
                {
                    $lookup: {
                        from: "employees",
                        localField: "employeeId",
                        foreignField: "_id",
                        as: "employee",
                    },
                },
                { $unwind: { path: "$employee", preserveNullAndEmptyArrays: true } },
                {
                    $project: {
                        status: 1,
                        message: 1,
                        createdAt: 1,
                        updatedAt: 1,
                        employee: {
                            _id: "$employee._id",
                            name: "$employee.name",
                            email: "$employee.email",
                            phone: "$employee.phone",
                            location: "$employee.location",
                        },
                    },
                },
                { $sort: { createdAt: -1 } },
            ])
            .toArray();

        return res.json({ requests });
    } catch (err) {
        console.log("getPendingHireRequests error:", err);
        return res.status(500).json({ message: "Server error" });
    }
};

export const updateHireRequestStatus = async (req, res) => {
    try {
        const db = await connection();
        const { status } = req.body;

        if (!["accepted", "rejected"].includes(status)) {
            return res.status(400).json({ message: "Invalid status" });
        }

        const requestId = new ObjectId(req.params.id);

        const hireReq = await db.collection("hireRequests").findOne({ _id: requestId });
        if (!hireReq) return res.status(404).json({ message: "Request not found" });

        if (hireReq.labourId.toString() !== req.user.id) {
            return res.status(403).json({ message: "Not allowed" });
        }

        await db.collection("hireRequests").updateOne(
            { _id: requestId },
            { $set: { status, updatedAt: new Date() } }
        );

        if (status === "accepted") {
            await db.collection("labour").updateOne(
                { _id: new ObjectId(req.user.id) },
                { $set: { available: false, updatedAt: new Date() } }
            );
        }

        return res.json({ message: "Status updated", status });
    } catch (err) {
        console.log("updateHireRequestStatus error:", err);
        return res.status(500).json({ message: "Server error" });
    }
};