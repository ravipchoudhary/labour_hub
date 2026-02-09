import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const secretKey = process.env.SECRET_KEY;

export const verifyAdminToken = (req,resp,next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return resp.status(401).send({
                successs:false,
                message:"Access denied,Token missing"
            })
        }

        const token = authHeader.split(" ")[1];

        if (!token) {
            return resp.status(401).send({
                successs:false,
                message:"Access denied,Invalid token format"
            })
        }

        const decoded = jwt.verify(token,secretKey);
        req.admin = decoded;
        next();
    }
    catch (err) {
        return resp.status(401).send({
                successs:false,
                message:"Invalid or Expired token"
            })
    }
}