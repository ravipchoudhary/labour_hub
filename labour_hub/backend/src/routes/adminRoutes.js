import express from "express";
import { adminLogin, adminRegister, resetPasswordDirect, verifyForgotPassword } from "../controllers/adminController.js";
import { verifyAdminToken } from "../middlewares/authMiddleware.js";

const adminRouter = express.Router();

adminRouter.post("/signup",adminRegister);
adminRouter.post("/login",adminLogin);
adminRouter.post("/verify-forgot-password",verifyForgotPassword);
adminRouter.post("/reset-password-direct",resetPasswordDirect);
adminRouter.get("/dashboard",verifyAdminToken,(req,resp)=> {
    resp.send({
        success:true,
        message:"Welcome to Admin Dashboard",
        admin: req.admin,
    })
})

adminRouter.get("/users",verifyAdminToken,(req,resp)=> {
    resp.send({
        success:true,
        message:"Users fetched successfully",
    })
})

adminRouter.get("/labours",verifyAdminToken,(req,resp)=> {
    resp.send({
        success:true,
        message:"Labours fetched successfully",
    })
})


export default adminRouter;