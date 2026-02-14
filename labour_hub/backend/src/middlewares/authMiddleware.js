import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const secretKey = process.env.SECRET_KEY;

export const verifyAdminToken = (req, resp, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) return resp.status(401).json({ success: false, message: "Token missing" });

        const token = authHeader.split(" ")[1];
        const decoded = jwt.verify(token, secretKey);
        req.admin = decoded;
        next();
    } catch (err) {
        return resp.status(401).json({ success: false, message: "Invalid or expired token" });
    }
};

export const protect = (req, resp, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) return resp.status(401).json({ success: false, message: "Token missing" });

        const token = authHeader.split(" ")[1];
        const decoded = jwt.verify(token, secretKey);
        req.user = decoded; 
        next();
    } catch (err) {
        return resp.status(401).json({ success: false, message: "Invalid or expired token" });
    }
};