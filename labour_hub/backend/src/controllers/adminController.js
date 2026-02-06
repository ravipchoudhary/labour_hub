import { connection, collectionName } from "../config/db.js"
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { error } from "console";
import bcrypt from "bcrypt";

dotenv.config();

const secretKey = process.env.SECRET_KEY;
const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

export const adminRegister = async (req, resp) => {

    try {
        const db = await connection();
        const {name,email,password}=req.body;
        const userData = req.body;
        if (!name,!email,!password) {
            return resp.status(400).send({
                message:"All fields are required",
                success:false,
            })
        }

        if(!isValidEmail(email)) {
            return resp.status(400).send({
                message:"invalid email",
                success:false
            })
        }

        if (password.length < 6) {
            return resp.status(400).send({
                message:"Password must at least 6 characters or more",
                success:false
            })
        }

        const existingUser = await db.collection(collectionName).findOne({email});
        if(existingUser) {
            return resp.status(400).send({
                message:"email already registered",
                success:false
            })
        }
        if(userData.password !== userData.confirmPassword) {
            return resp.send({success:false,
                message:"password do not match"
            })
        };
        delete userData.confirmPassword;
        userData.password = await bcrypt.hash(userData.password,10)
        const result = await db.collection(collectionName).insertOne(userData);


        const token = jwt.sign({email:userData.email}, secretKey, { expiresIn: "50d" })
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
    const { email,password}= req.body;
        const db = await connection();

        const user = await db.collection(collectionName).findOne({ email });

        if (user) {
            const isMatch = await bcrypt.compare(password,user.password);
            if(isMatch) {
                const token = jwt.sign({email:user.email}, secretKey, { expiresIn: "50d" })
            resp.status(200).send({
                success: true,
                message: "login success",
                token
            })
            } else {
                resp.status(401).send({
                message: "password invalid",
                success: false
            })
        }
            } else {
        resp.status(404).send({
            message: "User not found",success:false})
    }
}
        
            // const token = jwt.sign(userData, secretKey, { expiresIn: "50d" })
            // resp.status(201).send({
            //     success: true,
            //     message: "login success",
            //     token
            // })
         



    





