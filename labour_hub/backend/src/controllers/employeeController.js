import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { connection } from "../config/db.js";


const normalizeEmail = (email) => (email || "").toLowerCase().trim();


export const employeeRegister = async (req, res) => {
    try {
        const { name, email, phone, location, about, password } = req.body;


        if (!name || !email || !phone || !location || !about || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }


        const db = await connection();
        const employees = db.collection("employees");


        const cleanEmail = normalizeEmail(email);
        const cleanPhone = String(phone).trim();


        const exist = await employees.findOne({
            $or: [{ email: cleanEmail }, { phone: cleanPhone }],
        });


        if (exist) {
            return res.status(409).json({ message: "Email or phone already exists" });
        }


        const hashed = await bcrypt.hash(password, 10);


        const newEmployee = {
            name: String(name).trim(),
            email: cleanEmail,
            phone: cleanPhone,
            location: String(location).trim(),
            about: String(about).trim(),
            password: hashed,
            role: "employee",
            createdAt: new Date(),
        };


        const result = await employees.insertOne(newEmployee);


        return res.status(201).json({
            message: "Employee registered successfully",
            employeeId: result.insertedId,
            role: "employee",
        });
    } catch (err) {
        console.log("employeeRegister error:", err);
        return res.status(500).json({ message: err.message || "Server error" });
    }
};


export const employeeLogin = async (req, res) => {
    try {
        const { email, password } = req.body;


        if (!email || !password) {
            return res.status(400).json({ message: "Email and password required" });
        }


        const db = await connection();
        const employees = db.collection("employees");


        const cleanEmail = normalizeEmail(email);
        const user = await employees.findOne({ email: cleanEmail });


        if (!user) {
            return res.status(404).json({ message: "Employee not found" });
        }


        const ok = await bcrypt.compare(password, user.password);
        if (!ok) {
            return res.status(401).json({ message: "Wrong password" });
        }


        const token = jwt.sign(
            { id: user._id, role: "employee" },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );


        return res.json({
            message: "Login successful",
            token,
            role: "employee",
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                location: user.location,
            },
        });
    } catch (err) {
        console.log("employeeLogin error:", err);
        return res.status(500).json({ message: err.message || "Server error" });
    }
};