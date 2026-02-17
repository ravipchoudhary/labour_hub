import { ObjectId } from "mongodb";
import { connection } from "../config/db.js";

export const createHireRequest = async (req, res) => {
    try {
        const { labourId, employeeId, message } = req.body;

        if (!labourId || !employeeId) {
            return res.status(400).json({ message: "labourId and employeeId required" });
        }

        const db = await connection();
        const labours = db.collection("labours");      
        const employees = db.collection("employees");
        const requests = db.collection("hire_requests");

        const labour = await labours.findOne({ _id: new ObjectId(labourId) });
        const employee = await employees.findOne({ _id: new ObjectId(employeeId) });

        if (!labour) return res.status(404).json({ message: "Labour not found" });
        if (!employee) return res.status(404).json({ message: "Employee not found" });

        const already = await requests.findOne({
            labourId: new ObjectId(labourId),
            employeeId: new ObjectId(employeeId),
            status: "pending",
        });

        if (already) {
            return res.status(409).json({ message: "Request already pending" });
        }

        const doc = {
            labourId: new ObjectId(labourId),
            labourName: labour.name || "",
            labourPhone: labour.phone || "",
            employeeId: new ObjectId(employeeId),
            employeeName: employee.name || "",
            employeePhone: employee.phone || "",
            message: message || "I want to hire you",
            status: "pending",
            createdAt: new Date(),
        };

        await requests.insertOne(doc);

        return res.status(201).json({ success: true, message: "Hire request sent" });
    } catch (err) {
        console.log("createHireRequest error:", err);
        return res.status(500).json({ message: "Server error" });
    }
};

export const getLabourRequests = async (req, res) => {
    try {
        const { labourId } = req.params;

        const db = await connection();
        const requests = db.collection("hire_requests");

        const list = await requests
            .find({ labourId: new ObjectId(labourId) })
            .sort({ createdAt: -1 })
            .toArray();

        return res.json({ success: true, requests: list });
    } catch (err) {
        console.log("getLabourRequests error:", err);
        return res.status(500).json({ message: "Server error" });
    }
};

export const updateRequestStatus = async (req, res) => {
    try {
        const { requestId } = req.params;
        const { status } = req.body; 

        if (!["accepted", "rejected"].includes(status)) {
            return res.status(400).json({ message: "Invalid status" });
        }

        const db = await connection();
        const requests = db.collection("hire_requests");

        const result = await requests.updateOne(
            { _id: new ObjectId(requestId) },
            { $set: { status } }
        );

        if (!result.matchedCount) {
            return res.status(404).json({ message: "Request not found" });
        }

        return res.json({ success: true, message: `Request ${status}` });
    } catch (err) {
        console.log("updateRequestStatus error:", err);
        return res.status(500).json({ message: "Server error" });
    }
};