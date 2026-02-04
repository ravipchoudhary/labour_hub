import { connection, collectionName } from "../config/db.js"
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { error } from "console";

dotenv.config();

const secretKey = process.env.SECRET_KEY
export const adminRegister = async (req, resp) => {

    try {
        const db = await connection();
        const userData = req.body;
        const result = await db.collection(collectionName).insertOne(userData);

        
        const token = jwt.sign(userData, secretKey, { expiresIn: "10d" })
        resp.status(201).send({
            success: true,
            message: "signup success",
            token
        })
    } catch {
        resp.status(500).send({
            message: "User registered failed", error
        })
    }
};

export const adminLogin = async (req, resp) => {
    try {
        const db = await connection();
        const { email, password } = req.body
        const user = await db.collection(collectionName).findOne({ email: email });
        if (user && user.password == password) {
            resp.status(200).send({
                message: "User Login Succesful",
                user: { email: user.email },
                success: true
            })
        }
        else {
            resp.status(401).send({
                message: "Invalid email or password",
                success: false
            })
        }
    } catch (err) {
        resp.status(500).send({
            message: "internal server error", error: err.message
        })
    }
}