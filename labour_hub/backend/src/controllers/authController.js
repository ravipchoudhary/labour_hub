import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Admin from "../models/Admin.js";
import Labour from "../models/Labour.js";
export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        let user = await Admin.findOne({ email });
        if (!user) {
            user = await Labour.findOne({ email });
        }
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid password" });
        }
        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );
        res.json({
            message: "Login successful",
            token,
            role: user.role
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};