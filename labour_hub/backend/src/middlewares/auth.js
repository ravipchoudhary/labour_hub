import jwt from "jsonwebtoken";
import { ObjectId } from "mongodb";

export const requireAuth = (req, res, next) => {
    try {
        const header = req.headers.authorization || "";
        const token = header.startsWith("Bearer ") ? header.slice(7) : null;

        if (!token) return res.status(401).json({ message: "No token provided" });

        const decoded = jwt.verify(token, process.env.JWT_SECRET || "secret");
        req.user = {
            id: new ObjectId(decoded.id),
            role: decoded.role,
        };
        next();
    } catch (err) {
        return res.status(401).json({ message: "Invalid/Expired token" });
    }
};

export const requireRole = (roles = []) => {
    return (req, res, next) => {
        if (!req.user?.role) return res.status(401).json({ message: "Unauthorized" });
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ message: "Forbidden" });
        }
        next();
    };
};