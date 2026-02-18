import express from "express";
import {
    adminLogin, resetPasswordDirect, verifyForgotPassword,
    getAdminProfile, updateAdminProfile, changeAdminPassword,
    googleAdminLogin, recentRegistrations, getAllUsers, updateUserStatus,
    getLabourVerification,
    updateLabourVerificationStatus
} from "../controllers/adminController.js";
import { verifyAdminToken } from "../middlewares/authMiddleware.js";

const adminRouter = express.Router();

adminRouter.post("/login", adminLogin);
adminRouter.post("/google-login", googleAdminLogin);
adminRouter.post("/verify-forgot-password", verifyForgotPassword);
adminRouter.post("/reset-password-direct", resetPasswordDirect);
adminRouter.get("/dashboard", verifyAdminToken, (req, resp) => {
    resp.send({
        success: true,
        message: "Welcome to Admin Dashboard",
        admin: req.admin,
    })
})

adminRouter.get("/users", verifyAdminToken, (req, resp) => {
    resp.send({
        success: true,
        message: "Users fetched successfully",
    })
})

adminRouter.get("/labours", verifyAdminToken, (req, resp) => {
    resp.send({
        success: true,
        message: "Labours fetched successfully",
    })
})

adminRouter.get("/profile", verifyAdminToken, getAdminProfile);
adminRouter.put("/profile", verifyAdminToken, updateAdminProfile);
adminRouter.put("/change-password", verifyAdminToken, changeAdminPassword);
adminRouter.get("/recent-users", verifyAdminToken, recentRegistrations);
adminRouter.get("/all-users", verifyAdminToken, getAllUsers);
adminRouter.put("/all-users/:id/status", verifyAdminToken, updateUserStatus);
adminRouter.get("/admin/labour-verification",verifyAdminToken,getLabourVerification);
adminRouter.put("/admin/labour-verification-status/:id",verifyAdminToken,updateLabourVerificationStatus)


export default adminRouter;